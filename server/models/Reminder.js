const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  name: String,
  number: String,
  time: {
    type: Date,
    index: true
  },
  timeZone: String
});

module.exports = mongoose.model('Reminder', ReminderSchema);
