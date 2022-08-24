const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const messageSchema = new mongoose.Schema(
    {
        conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
        sender: { type: mongoose.Types.ObjectId, ref: 'User' },
        recipient: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: String,
        media: {
            type: { url: String, public_id: String }
        },
        icon: { type: Boolean, default: false },

    },
    {
        timestamps: true,
    }
);

messageSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });

module.exports = mongoose.model('Message', messageSchema);
