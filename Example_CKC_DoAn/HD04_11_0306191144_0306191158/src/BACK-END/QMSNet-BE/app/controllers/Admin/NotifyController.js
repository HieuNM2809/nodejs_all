const { getFilter } = require('../../../utils/request_utils');
const createRes = require('../../../utils/response_utils');
const Notifies = require('../../modules/notify')
const APIFeatures = require('../../../utils/pagination')


const NotifyController = {
    getAll: async (req, res, next) => {
        try {

            const filter = getFilter(req);
            let hasDeletedFilter = false;
            if (filter?.deleted === false) {
                delete filter.deleted;
                hasDeletedFilter = true;
            }

            const features = new APIFeatures(await Notifies.find(filter).sort('-createdAt').populate('user', 'username _id'), req.body).paginating();

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

            const report = new Notifies(data);

            await report.save();

            return res.json(createRes.success('Thành công'))

        } catch (error) {
            return next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const id = req.params.id;

            const report = await Notifies.delete({
                _id: id
            }, userId);

            return res.json(createRes.success('Xóa thông báo thành công', report))

        } catch (error) {
            return next(error);
        }
    },

}

module.exports = NotifyController;