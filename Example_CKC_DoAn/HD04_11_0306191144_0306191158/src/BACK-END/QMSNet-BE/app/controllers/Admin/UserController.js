const createRes = require('../../../utils/response_utils');

const Users = require('../../modules/user')
const bcrypt = require('bcrypt');
const { getFilter } = require('../../../utils/request_utils');


class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.total = query.length;
        this.count = 0;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 0;
        const limit = this.queryString.limit * 1 || 0;
        const skip = (page - 1) * limit;
        if (limit !== 0) {
            this.query = this.query.splice(skip, limit);
        }
        this.count = this.query.length;
        return this;
    }
}

const UserController = {

    getAll: async (req, res, next) => {

        try {
            const filter = getFilter(req);

            const features = new APIFeatures(await Users.find(filter).sort('-createdAt').select('-password'), req.body).paginating();

            return res.json(createRes.success('Thành công!', {
                rows: features.query,
                total: features.total,
                pagination: {
                    page: req?.body?.page,
                    limit: req?.body?.limit,
                    count: features.count
                }
            }))
        } catch (error) {
            return next(error);
        }
    },
    update: async (req, res, next) => {
        const newValues = req.body;


        try {
            const newInfo = await Users.findOneAndUpdate({ _id: req.params.id }, newValues, { new: true });
            return res.status(200).json(createRes.success('Chỉnh sửa thông tin  thành công!', newInfo))
        } catch (error) {
            return next(error)
        }
    },
    new: async (req, res, next) => {
        try {
            const { fullname, email, password, username } = req.body;
            let newUsername = username.toLowerCase().replace(/ /g, '');
            const user_name = await Users.findOne({ username: newUsername });
            const regex = /^[a-z0-9]+$/
            if (!regex.test(newUsername)) {

                return next(createRes.error('Tên tài khoản chỉ chứa những kí tự a-z 0-9.'));
            }
            if (user_name)
                return next(createRes.error('Rất tiếc, tên tài khoản này không hợp lệ. Vui lòng sử dụng tên tài khoản khác.'));
            if (username?.length < 6)
                return next(createRes.error(
                    'Tên tài khoản nhiều hơn 6 ký tự.',
                ));
            if (username?.length > 30)
                return next(createRes.error(
                    'Tên tài khoản không quá 30 ký tự.'
                ));

            if (fullname?.length < 6)
                return next(createRes.error(
                    'Họ tên nhiều hơn 6 ký tự.',
                ));

            if (fullname?.length > 30)
                return next(createRes.error(
                    'Họ tên không quá 30 ký tự.',
                ));


            const user_email = await Users.findOne({ email });
            if (user_email)
                return next(createRes.error(
                    'Rất tiếc, email này đã tồn tại. Vui lòng sử dụng email khác.',
                ));

            if (password.length < 6)
                return next(createRes.error(
                    'Mật khẩu nhiều hơn 6 ký tự.',
                ));

            const hashPassword = await bcrypt.hash(password, 12);

            const newUser = new Users({
                ...req.body,
                password: hashPassword,
                username: newUsername,
            });

            await newUser.save();

            return res.status(201).json(createRes.success('Tạo tài khoản thành công', {

            }));
        } catch (err) {
            return next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.user._id;
            await Users.delete({ _id: req.params.id }, userId);
            return res.status(200).json(createRes.success('Xóa người dùng thành công!'))
        } catch (error) {
            return next(error)
        }
    },
}

module.exports = UserController;