const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const ReportTypeSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['C', 'A']
    },
    name: String,
})

ReportTypeSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });


module.exports.ReportTypes = mongoose.model('ReportType', ReportTypeSchema)
module.exports.ReportTypeSchemma = ReportTypeSchema
