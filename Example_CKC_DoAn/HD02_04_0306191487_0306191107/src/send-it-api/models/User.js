const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
    },
    full_name: {
      type: String,
      min: 6,
      required: true,
    },
    phone: {
      type: String,
      min: 10,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    cash: {
      type: Number,
      default: 0,
    },
    dashboard_bg_color: {
      type: String,
      default: '',
    },
    conversations: {
      type: Array,
      required: false,
      default: [],
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
