const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      require: true,
    },
    members: {
      type: Array,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
    },
    display_img: {
      type: String,
      required: false,
    },
    last_message_id: {
      type: String,
      default: '',
    },
    last_message: {
      type: String,
      default: '',
    },
    last_message_is_image: {
      type: Boolean,
      default: false,
    },
    last_message_is_file: {
      type: Boolean,
      default: false,
    },
    last_message_image: {
      type: String,
      default: '',
    },
    last_sender: {
      type: String,
      default: '',
    },
    last_senderId: {
      type: String,
      default: '',
    },
    last_sendAt: {
      type: Date,
      require: true,
    },
    image_list: {
      type: Array,
      require: true,
      default: [],
    },
    file_list: {
      type: Array,
      require: true,
      default: [],
    },
    status: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
