const mongoose = require('mongoose');

const scheduler = require('../scheduler');

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

/*************************************
 * Finds all reminders that need sending if
 * server restarts and schedules them again.
 */
ReminderSchema.statics.query = function() {
  Reminder.find({}).then(reminders => {
    reminders.forEach(function(reminder) {
      // console.log('sched for ' + reminder.name);
      scheduler.scheduleSEND(reminder);
    });
  });
};
/**************************************/

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
