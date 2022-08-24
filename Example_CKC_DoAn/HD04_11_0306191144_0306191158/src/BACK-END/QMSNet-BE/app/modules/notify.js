const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const notifySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        recipients: [mongoose.Types.ObjectId],
        text: String,
        userId: mongoose.Types.ObjectId,
        postId: mongoose.Types.ObjectId,
        commentId: mongoose.Types.ObjectId,
        replyId: mongoose.Types.ObjectId,
        content: String,
        reportId: mongoose.Types.ObjectId,
        action: {
            type: Number,
            required: true
        },
        media: [{
            public_id: String,
            url: String,
        }],
        isRead: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

notifySchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })

module.exports = mongoose.model('Notify', notifySchema);
