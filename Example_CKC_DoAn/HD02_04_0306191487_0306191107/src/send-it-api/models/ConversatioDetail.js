const mongoose = require('mongoose');

const ConversationDetailSchema = new mongoose.Schema(
    {
        conversation_id: {
            type: String,
            require: true,
        },
        user_id: {
            type: String,
            require: true,
        },
        nick_name: {
            type: String,
            require: false,
        },
        unread_count: {
            type: Number,
            require: false,
        },
        date_in: {
            type: Date,
            require: true,
        },
        date_out: {
            type: Date,
            require: true,
        },
        role: {
            type: Number,
            require: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ConversationDetail', ConversationDetailSchema);
