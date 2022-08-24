const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const { ReportTypeSchemma } = require('./ReportType');

const ReportSchema = mongoose.Schema({
    reportType: ReportTypeSchemma,
    description: String,
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
    comment: { type: mongoose.Types.ObjectId, ref: 'Comment' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: [
            'P',
            'I',
            'R',
            'N'
        ],
        default: 'P'
    },
    result: {
        type: String,
        enum: [
            'W',
            'D',
            'B'
        ]
    },
    resultNote: String,
    solvedBy: { type: mongoose.Types.ObjectId, ref: 'User' },

}, {
    timestamps: true
})

ReportSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });



module.exports = mongoose.model('Report', ReportSchema)