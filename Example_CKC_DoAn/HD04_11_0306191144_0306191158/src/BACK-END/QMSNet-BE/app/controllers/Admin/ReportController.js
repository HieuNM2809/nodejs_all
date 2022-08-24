const createRes = require('../../../utils/response_utils');
const { getFilter } = require('../../../utils/request_utils');
const Report = require('../../modules/report')
const Notifies = require('../../modules/notify')
const Posts = require('../../modules/post')
const Users = require('../../modules/user')
const APIFeatures = require('../../../utils/pagination');
const sendMail = require('../../../utils/sendMail');

const ReportController = {
    getAll: async (req, res, next) => {
        try {
            const filter = getFilter(req);

            let features = new APIFeatures(await Report.find(filter).populate(

                'user', '-password',

            ).populate('post').populate('comment').sort('-createdAt'), req.body).paginating();

            if (filter?.username) {
                let re = new RegExp(filter.username['$regex'], 'i');
                features.query = features.query.filter((r) => r.user.username.match(re))
                features.count = features.query.length;
            }

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
    get: async (req, res, next) => {
        try {

            const data = await Report.findOne({
                _id: req.params.id
            }).populate(

                'user', '-password',

            ).populate(
                {
                    path: 'post',
                    populate: {
                        path: 'user',
                        select: '-password'
                    }
                }
            ).populate('comment')

            return res.json(createRes.success('Thành công!', data))

        } catch (error) {
            return next(error);
        }
    },
    new: async (req, res, next) => {
        try {
            const data = req.body;

            const report = new Report(data);

            await report.save();

            return res.json(createRes.success('Báo cáo thành công', report))

        } catch (error) {
            return next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;

            const report = await Report.findOneAndUpdate({
                _id: id,
                deleted: false,
            }, data, {
                new: true
            }).populate('user', '-password').populate('post');

            if (report?.result) {
                switch (report?.result) {
                    case 'W':
                        await Notifies.findOneAndUpdate({
                            action: 6,
                            $or: [
                                {
                                    postId: report?.post?._id,
                                }, {
                                    userId: report?.user?._id
                                }
                            ]
                        }, {
                            reportId: report?._id,
                            text: 'Bạn bị hệ thống nhắc nhở vì vi phạm nội dung trên QMNets.',
                            recipients: [report?.post?.user?._id, report?.user?._id],
                            isRead: false,

                        }, {
                            upsert: true
                        })

                        const reports = await Report.find({
                            user: report?.user?._id,
                            $or: [
                                {
                                    result: 'W'
                                },
                                {
                                    result: 'D'
                                },
                                {
                                    result: 'B'
                                },
                            ]
                        })

                        if (reports.length > 3) {

                            const user = await Users.findOneAndUpdate({ _id: report?.user?._id || report?.post?.user?._id }, {
                                status: 'B'
                            });
                            const mailInfo = {
                                from: process.env.ADMIN_EMAIL, // sender address
                                to: `${user?.email}`, // list of receivers
                                subject: `QMNets xin chào! Tài khoản ${user.username} của bạn đã bị khóa.`, // Subject line
                                text: `Xin chào ${user?.email}!`,
                                // HTML body
                                html: `
                                <p>Chào bạn!....</p>
                                <p>Tài khoản <b>${user.username}</b> của bạn đã bị khóa vì <b>Vi phạm nội dung trên QMNets quá số lần quy định</b>, bạn vui lòng liên hệ <a href="mailto: support@qmnets.social">Support@qmnets.social</a> để được hỗ trợ.</p>
                                <p>Cảm ơn và hẹn gặp lại bạn sau.</p>
                                <p style="color:#ea1e30">Chú ý: Không trả lời email này.</p>`
                            }
                            sendMail(mailInfo);

                        }

                        break;
                    case 'D':
                        await Notifies.findOneAndUpdate({
                            action: 6,
                            $or: [
                                {
                                    postId: report?.post,
                                }, {
                                    userId: report?.user
                                }
                            ]
                        }, {
                            reportId: report?._id,
                            text: 'Nội dung của bạn đã bị xóa vì vi phạm nội dung trên QMNets.',
                            recipients: [report?.post?.user?._id || report?.user?._id],
                            isRead: false,

                        }, {
                            upsert: true
                        })
                        await Posts.delete(report?.post, req.user._id);
                        break;
                    case 'B':
                        const user = await Users.findOneAndUpdate({ _id: report?.user?._id || report?.post?.user?._id }, {
                            status: 'B'
                        });
                        if (report?.post) {

                            await Posts.delete(report?.post, req.user._id);
                        }

                        const mailInfo = {
                            from: process.env.ADMIN_EMAIL, // sender address
                            to: `${user?.email}`, // list of receivers
                            subject: `QMNets xin chào! Tài khoản ${user.username} của bạn đã bị khóa.`, // Subject line
                            text: `Xin chào ${user?.email}!`,
                            // HTML body
                            html: `
                            <p>Chào bạn!....</p>
                            <p>Tài khoản của bạn <b>${user.username}</b> đã bị khóa vì <b>Vi phạm nội dung trên QMNets</b>, bạn vui lòng liên hệ <a href="mailto: support@qmnets.social">Support@qmnets.social</a> để được hỗ trợ.</p>
                            <p>Cảm ơn và hẹn gặp lại bạn sau.</p>
                            <p style="color:#ea1e30">Chú ý: Không trả lời email này.</p>`
                        }

                        sendMail(mailInfo);

                        break;

                    default:
                        break;
                }
            }


            return res.json(createRes.success('Chỉnh sửa báo cáo thành công', report))

        } catch (error) {
            return next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const id = req.params.id;

            const report = await Report.delete({
                _id: id
            }, userId);

            return res.json(createRes.success('Xóa loại báo cáo thành công', report))

        } catch (error) {
            return next(error);
        }
    },

}

module.exports = ReportController;