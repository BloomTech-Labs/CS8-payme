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
          notify.minuteWorker.run();
        },
        null,
        true,
        ''
      );
      new CronJob(
        '00 00 23 * * * ', // runs everyday
        function() {
          console.log('Running send at ' + moment().format());
          notify.dailyWorker.run();
        },
        null,
        true,
        ''
      );
      new CronJob(
        '00 12 * * * mon ', // runs every week, noon on mondays
        function() {
          console.log('Running send at ' + moment().format());
          notify.weeklyWorker.run();
        },
        null,
        true,
        ''
      );
      new CronJob(
        '00 12 * 1 * * ', // runs monthly at noon every 1st
        function() {
          console.log('Running send at ' + moment().format());
          notify.monthlyWorker.run();
        },
        null,
        true,
        ''
      );
    }
  };
};
module.exports = scheduler();
