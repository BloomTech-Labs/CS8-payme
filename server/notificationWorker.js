const Reminder = require('./models/Reminder.js');

const notificationWorker = function() {
  return {
    run: function() {
      Reminder.sendNotifications();
    },
  };
};

module.exports = notificationWorker();
