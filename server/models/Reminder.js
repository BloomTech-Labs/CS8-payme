const mongoose = require('mongoose');
// const moment = require('moment');
const Twilio = require('twilio');

const Reminder = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  message: String,
  notification: Number,
  time: {
    type: Date,
    index: true,
  },
  timeZone: String,
});

// ReminderSchema.methods.requiresNotification = function(date) {
//   return (
//     Math.round(
//       moment
//         .duration(
//           moment(this.time)
//             .tz(this.timeZone)
//             .utc()
//             .diff(moment(date).utc())
//         )
//         .asMinutes()
//     ) === this.notification
//   );
// };

Reminder.statics.sendNotifications = function(callback) {
  const searchDate = new Date();
  Reminder.find()
    .then(function(reminders) {
      // reminders = reminders.filter(reminder => {
      //   return reminder.requiresNotification(searchDate);
      // });
      sendNotifications(reminders);
    })
    .catch(err => {
      console.log(err);
      console.log('error in sendN');
    });

  // reminders array
  function sendNotifications(reminders) {
    const client = new Twilio(accountSid, authToken);
    reminders.forEach(function(reminder) {
      // options for according to each client
      const options = {
        to: `+1 ${reminder.phoneNumber}`,
        from: twilioNumber,
        body: `${reminder.message}` // Place holder.
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
    if (callback) {
      callback.call();
    }
  }
};

// const Reminder = mongoose.model('Reminder', ReminderSchema);
// module.exports = Reminder;

module.exports = mongoose.model('Reminder', Reminder);
