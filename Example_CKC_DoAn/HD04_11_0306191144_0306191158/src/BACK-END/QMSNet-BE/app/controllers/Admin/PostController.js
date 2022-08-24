const createRes = require('../../../utils/response_utils');
const { getFilter } = require('../../../utils/request_utils');
const Posts = require('../../modules/post')
const APIFeatures = require('../../../utils/pagination');
const mongoose = require('mongoose');

const PostController = {
    getAll: async (req, res, next) => {
        try {
            const filter = getFilter(req);



            const features = new APIFeatures(await Posts.find(filter).populate(
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

            const post = await Posts.delete({
                _id: id
            }, userId);

            return res.json(createRes.success('Xóa bài viết thành công', post))

        } catch (error) {
            return next(error);
        }
    },

}

module.exports = PostController;