const CronJob = require('cron').CronJob;
const notificationWorker = require('./notificationWorker.js');
const moment = require('moment');

const scheduler = function() {
  return {
    start: function() {
      console.log("scheduler starting");
      new CronJob(
        '00 * * * * * ', // change to daily
        function() {
          console.log('Running send at ' + moment().format());
           notificationWorker.daily();
           notificationWorker.weekly();
           notificationWorker.monthly();
        },
        null,
        true,
        ''
      );
    },

  };
};
module.exports = scheduler();



// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )