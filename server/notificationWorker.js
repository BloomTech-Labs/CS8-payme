const Reminder = require('./models/reminder.js');

const notificationWorker = function() {
  return {
    run: function() {
      Reminder.sendNotifications();
    }
  };
};

module.exports = notificationWorker();
