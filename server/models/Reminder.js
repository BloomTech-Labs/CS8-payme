const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const ReminderSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  remind: String, // minute, daily, weekly, monthly
  message: String,
  time: {
    type: Date,
    default: Date.now
  }
});

ReminderSchema.statics.Minute = function() {
  Reminder.find({ remind: 'minute' }).then(reminders => {
    sendNotifications(reminders);
  });
};
ReminderSchema.statics.Daily = function() {
  Reminder.find({ remind: 'daily' }).then(reminders => {
    sendNotifications(reminders);
  });
};
ReminderSchema.statics.Weekly = function() {
  Reminder.find({ remind: 'weekly' }).then(reminders => {
    sendNotifications(reminders);
  });
};
ReminderSchema.statics.Monthly = function() {
  Reminder.find({ remind: 'monthly' }).then(reminders => {
    sendNotifications(reminders);
  });
};

function sendNotifications(reminders) {
  const client = new Twilio(accountSid, authToken);
  reminders.forEach(function(reminder) {
    // options for according to each client
    console.log('inside sender', reminder);
    const options = {
      to: `+1 ${reminder.phoneNumber}`,
      from: twilioNumber,
      body: reminder.message
    };
    // send message
    client.messages.create(options, function(err, response) {
      if (err) {
        // just log for now
        console.log(err);
      } else {
        let masked = reminder.phoneNumber.substr(
          0,
          reminder.phoneNumber.length - 5
        );
        masked += '*****';
        // log who it was sent to with asterisk
        console.log(`Message sent to ${masked}`);
      }
    });
  });
  // Don't wait on success/failure, just indicate all messages have been
  // queued for delivery
  // if (callback) {
  //   callback.call();
  // }
}

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
