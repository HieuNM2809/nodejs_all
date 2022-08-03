const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
    message_date: {
      type: Date,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    user_image: {
      type: String,
      require: true,
    },
    conversation_id: {
      type: String,
      require: true,
    },
    isImage: {
      type: Boolean,
      require: true,
      default: false,
    },
    isFile: {
      type: Boolean,
      require: true,
      default: false,
    },
    message_image: {
      type: String,
      require: false,
      default: '',
    },
    quick_emoji: {
      type: Array,
      require: false,
      default: [],
    },
    status: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
