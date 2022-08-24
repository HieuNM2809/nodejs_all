const Users = require('../modules/user');
const Notifies = require('../modules/notify');
const bcrypt = require('bcrypt');
const createRes = require('../../utils/response_utils');
const mongoose = require('mongoose');

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating(isData) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 20;
        const skip = (page - 1) * limit;
        if (isData) {
            this.query = this.query.splice(skip, limit);
        } else {
            this.query = this.query.skip(skip).limit(limit);
        }
        return this;
    }
}

const userController = {
    getAll: async (req, res, next) => {
        try {
            const features = new APIFeatures(Users.find({
                _id: { $in: req.body.userIds }
            }), req.query).paginating()

            const users = await features.query.select('-password');

            return res.json(createRes.success('Thành công', {
                users,
                pagination: {
                    ...req.query, count: users.length
                }
            }))

        } catch (err) {
            return next(err)
        }
    },
    searchUser: async (req, res, next) => {
        try {
            const users = await Users.find({
                $and: [
                    { username: { $regex: req.query.username } },
                    { username: { $ne: req.user.username } },
                    { _id: { $nin: req.user.blocks } }, {
                        status: 'A',
                        deleted: false,
                    },
                ],
                blocks: {
                    $ne: req.user._id
                }
            })
                .limit(10)
                .select('username avatar fullname');
            return res.status(200).json(createRes.success('Thành công', users));
        } catch (error) {
            return next(error);
        }
    },
    getUser: async (req, res, next) => {
        const filter = mongoose.isValidObjectId(req.params.id) ? '_id' : 'username';
        try {
            const user = await Users.findOne({
                [filter]: req.params.id,
                status: 'A',
                deleted: false,
            })
                .select('-password')

            if (!user)
                return next(createRes.error('Không thể truy cập trang cá nhân này'))
            if (req.user.blocks.includes(user._id) || user.blocks.includes(req.user._id))
                return next(createRes.error('Không thể truy cập trang cá nhân này.'))

            return res.json(createRes.success('Thành công!', user));
        } catch (error) {
            next(error);
        }
    },
    changeAvatar: async (req, res) => {
        const { newAvatar } = req.body;

        try {
            if (!newAvatar)
                return res.status(400).json({ message: 'File does not exist' });
            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { avatar: newAvatar.url }
            );
            return res.status(200).json({ message: 'susses' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateUser: async (req, res, next) => {
        const newValues = req.body;

        try {
            const newInfo = await Users.findByIdAndUpdate(req.user._id, newValues, {
                new: true
            }).populate({
                path: 'saved',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            });
            return res.status(200).json(createRes.success('Chỉnh sửa thông tin cá nhân thành công!', newInfo))
        } catch (error) {
            return next(error)
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const { oldPassword, password, confirmPassword } = req.body;

            const isPasswordMatch = await bcrypt.compare(
                oldPassword,
                req.user.password
            );
            if (!isPasswordMatch)
                return next(createRes.error('Mật khẩu cũ không chính xác'));

            if (password !== confirmPassword)
                return next(createRes.error('Mật khẩu không khớp'));

            if (password.length < 6)
                return next(createRes.error('Mật khẩu ít nhất 6 ký tự'));

            const hasPassword = await bcrypt.hash(password, 12);

            await Users.findByIdAndUpdate(req.user._id, { password: hasPassword });

            return res
                .status(200)
                .json(createRes.success('Thay đổi mật khẩu thành công!'));
        } catch (error) {
            next(error);
        }
    },
    follow: async (req, res, next) => {
        try {

            if (req.user.following.includes(req.params.id))
                next(createRes.error('Bạn đã theo dõi tài khoản này rồi.'))
            const [follower, following] = await Promise.all([Users.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { followers: req.user._id } },
                { new: true }
            ).select('-password'), Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { following: req.params.id } },
                { new: true }
            ).select('-password'), Notifies.findOneAndUpdate({
                userId: req.user._id,
                action: 1,
            }, {
                text: 'đã theo dõi bạn.',
                recipients: [req.params.id],
                user: req.user,
                isRead: false,
            }, {
                upsert: true
            }

            )])

            return res.json(createRes.success('Follow thành công', { follower, following }));
        } catch (error) {
            next(error)
        }
    },
    unFollow: async (req, res, next) => {
        try {
            const user = await Users.findOne({
                _id: req.params.id,
                followers: req.user._id,
            });
            if (!user)
                return next(createRes.error('Bạn chưa theo dõi tài khoản này.'))
            const follower = await Users.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { followers: req.user._id } },
                { new: true }
            ).select('-password')
            const following = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { following: req.params.id } },
                { new: true }
            ).select('-password')

            return res.json(createRes.success('Unfollow thành công', { follower, following }));
        } catch (error) {
            return next(error);
        }
    },
    block: async (req, res, next) => {
        try {

            if (req.user.blocks.includes(req.params.id))
                next(createRes.error('Bạn đã chặn tài khoản này rồi.'))
            await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $push: { blocks: req.params.id } },
            ).select('-password');
            const [follower, following] = await Promise.all([Users.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { followers: req.user._id, following: req.user._id } },
                { new: true }
            ).select('-password'), Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { following: req.params.id, followers: req.params.id } },
                { new: true }
            ).select('-password')])

            return res.json(createRes.success('Block thành công', following));
        } catch (error) {
            return next(error)
        }
    },
    getBlock: async (req, res, next) => {
        try {

            const blocks = await Users.find(
                { _id: req.user.blocks },
            ).select('-password');

            return res.json(createRes.success('Thành công', blocks));
        } catch (error) {
            return next(error)
        }
    },
    unBlock: async (req, res, next) => {
        try {
            if (!(req.user.blocks.includes(req.params.id)))
                next(createRes.error('Bạn chưa chặn tài khoản này rồi.'))
            const newUser = await Users.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { blocks: req.params.id } },
                { new: true }
            ).select('-password');

            return res.json(createRes.success('Unblock thành công', newUser));

        } catch (error) {
            return next(error);
        }
    },

    requests: async (req, res, next) => {
        try {
            const features = new APIFeatures(
                Users.find({
                    _id: { $in: [...req.user.followers], $nin: [...req.user.following] },
                    status: 'A',
                    deleted: false
                }),
                req.query
            ).paginating();
            const users = await features.query.select('-password');

            return res.json(createRes.success('Thành công!', {
                users,
                pagination: {
                    ...req.query, count: users.length
                }
            }))

        } catch (error) {
            next(error)

        }
    },

    suggestionsUser: async (req, res, next) => {
        try {

            const newArr = [...req.user.following, ...req.user.followers, req.user._id, ...req?.body?.userIgnore].map((user) => new mongoose.Types.ObjectId(user));

            const users = await Users.aggregate([
                {
                    $match: {
                        _id: { $nin: newArr }, status: 'A', deleted: false, blocks: {
                            $ne: req.user._id
                        }
                    }
                },
                { $sample: { size: 8 } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'followers',
                        foreignField: '_id',
                        as: 'followers',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'following',
                        foreignField: '_id',
                        as: 'following',
                    },
                },
            ]).project('-password');

            const userIgnore = users.map((user) => user._id);


            return res.json(createRes.success('Thành công!', {
                users,
                total: users.length,
                userIgnore
            }));
        } catch (err) {
            return next(err);
        }
    },

    updateUserSetting: async (req, res, next) => {
        try {
            const data = req.body;
            const currentSetting = req.user.userSettings;
            const newSettings = { ...currentSetting, ...data };
            const newUser = await Users.findOneAndUpdate({ _id: req.user._id }, {
                userSettings: newSettings,
            }, {
                new: true
            });

            return res.json(createRes.success('Thành công', newUser));

        } catch (error) {
            next(error);

        }
    }
};

module.exports = userController;
