const { getFilter } = require('../../../utils/request_utils');
const createRes = require('../../../utils/response_utils');
const { PostStyles } = require('../../../app/modules/postStyle')
const APIFeatures = require('../../../utils/pagination')


const PostStyleController = {
    getAll: async (req, res, next) => {
        try {

            const filter = getFilter(req);
            let hasDeletedFilter = false;
            if (filter?.deleted === false) {
                delete filter.deleted;
                hasDeletedFilter = true;
            }

            const features = new APIFeatures(await PostStyles.find(filter).sort('-createdAt'), req.body).paginating();

            if (hasDeletedFilter) {
                features.query = features.query.filter((r) => !r.deleted)
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
    new: async (req, res, next) => {
        try {
            const data = req.body;

            const report = new PostStyles(data);

            await report.save();

            return res.json(createRes.success('Thành công'))

        } catch (error) {
            return next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = req.body;
            const id = req.params.id;

            const report = await PostStyles.findOneAndUpdate({
                _id: id
            }, data, {
                new: true
            });


            return res.json(createRes.success('Chỉnh sửa chủ đề bài viết thành công', report))

        } catch (error) {
            return next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const id = req.params.id;

            const report = await PostStyles.delete({
                _id: id
            }, userId);

            return res.json(createRes.success('Xóa chủ đề bài viết thành công', report))

        } catch (error) {
            return next(error);
        }
    },

}

module.exports = PostStyleController;