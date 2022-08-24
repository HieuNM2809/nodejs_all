const createRes = require('../../../utils/response_utils');
const { getFilter } = require('../../../utils/request_utils');
const Comments = require('../../modules/comment')
const APIFeatures = require('../../../utils/pagination');

const CommentController = {
    getAll: async (req, res, next) => {
        try {
            const filter = getFilter(req);



            const features = new APIFeatures(await Comments.find(filter).populate(
                'user', '-password',

            ).sort('-createdAt'), req.body).paginating();

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
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const userId = req.user._id;

            const comment = await Comments.delete({
                _id: id
            }, userId);

            return res.json(createRes.success('Xóa bình luận thành công', comment))

        } catch (error) {
            return next(error);
        }
    },

}

module.exports = CommentController;