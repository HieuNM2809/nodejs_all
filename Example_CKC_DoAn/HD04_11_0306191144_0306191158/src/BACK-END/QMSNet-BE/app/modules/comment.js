const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            maxLength: 2000,
            required: true,
        },
        tag: Object,
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                default: [],
            },
        ],
        reply: mongoose.Types.ObjectId,
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        postId: mongoose.Types.ObjectId,
    },
    {
        timestamps: true,
    }
);

commentSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });

module.exports = mongoose.model('Comment', commentSchema);
