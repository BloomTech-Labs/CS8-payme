const Invoices = require('./models/invoices.js');

const notificationWorker = function() {
  return {
    daily: function() {
      console.log("notification worker running")
      Invoices.sendNotifications("daily");
    },
    weekly: function() {
      console.log("notification worker running")
      Invoices.sendNotifications("weekly");
    },
    monthly: function() {
      console.log("notification worker running")
      Invoices.sendNotifications("monthly");
    },
  };
};

module.exports = notificationWorker();
