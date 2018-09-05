const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  invoiceId: String,
  name: String,
  company: String,
  email: String,
  phoneNumber: String,
  message: String,
  amount: {
    type: Number,
  },
  isEmail: {
    type: Boolean,
    default: false,
  },
  remind: {
    type: String,
    default: 'weekly',
  }, // minute, daily, weekly, monthly
  days: {
    type: Date,
    default: Date.now(),
  },
});

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
