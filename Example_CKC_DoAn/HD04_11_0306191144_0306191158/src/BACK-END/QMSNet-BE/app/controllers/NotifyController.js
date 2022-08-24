const createRes = require('../../utils/response_utils');
const Notifies = require('../modules/notify');

const NotifyController = {
    createNotify: (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body;

            if (recipients.includes(req.user._id.toString())) return;
            recipients.forEach(async (item) => {
                const notify = new Notifies({
                    id,
                    recipients: [item],
                    url,
                    text,
                    content,
                    image,
                    user: req.user._id,
                });

                await notify.save();
            });

            return res.json({ message: 'Success' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getNotifies: async (req, res, next) => {
        try {
            const data = await Notifies.find({
                recipients: req.user._id,

            })
                .sort('-updatedAt')
                .populate({
                    path: 'user', match: {
                        deleted: false,
                        status: 'A'
                    }, select: 'avatar username deleted status'
                })
                .limit(40);


            const notifies = data.filter((n) => !n?.deleted || n.deleted === false)

            return res.json(createRes.success('Success', notifies));
        } catch (err) {
            return next(err);
        }
    },

    readAll: async (req, res, next) => {
        try {
            await Notifies.updateMany({
                isRead: false
            }, {
                isRead: true
            }, {
                timestamps: false,
            })
            return res.json(createRes.success('Success'));
        } catch (error) {
            next(error);
        }
    },

    isReadNotify: async (req, res, next) => {
        try {
            const notifies = await Notifies.findOneAndUpdate(
                { _id: req.params.id },
                {
                    isRead: true,
                }, {
                timestamps: false,
            }
            );

            return res.json(createRes.success('Success', notifies));
        } catch (err) {
            return next(err);
        }
    },
    UnReadNotify: async (req, res, next) => {
        try {
            const notifies = await Notifies.findOneAndUpdate(
                { _id: req.params.id },
                {
                    isRead: false,
                }, {
                new: true,
                timestamps: false,
            }
            );

            return res.json(createRes.success('Đánh dấu chưa đọc thành công.', notifies));
        } catch (err) {
            return next(err);
        }
    },
    DeleteNotify: async (req, res, next) => {
        const userId = req.user._id;
        try {
            const notifies = await Notifies.delete(
                { _id: req.params.id }
                , userId);

            return res.json(createRes.success('Gỡ thông báo cáo thành công', notifies));
        } catch (err) {
            return next(err);
        }
    },
};

module.exports = NotifyController;
