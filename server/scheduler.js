const CronJob = require('cron').CronJob;
const notify = require('./notificationWorker.js');
const moment = require('moment');
const Reminder = require('./models/Reminder.js');

const scheduler = function() {
  return {
    start: function() {
      new CronJob(
        '00 * * * * * ',
        function() {
          console.log('Running send at ' + moment().format());
          notify.notificationWorker.run();
        },
        null,
        true,
        ''
      );
    }
  };
};
module.exports = scheduler();
