const CronJob = require('cron').CronJob;
const notificationWorker = require('./notificationWorker.js');
const moment = require('moment');

const scheduler = function() {
  return {
    start: function() {
      // *********** FOR TESTING****************
      // new CronJob(
      //   // runs every minute
      //   '00 * * * * *',
      //   function() {
      //     console.log(
      //       'Running Send Notifications Worker for ' + moment().format()
      //     );
      //     notificationWorker.run();
      //   },
      //   null,
      //   true,
      //   ''
      // );
      // ***************************************
      new CronJob(
        '00 00 11 * * 0-6', // this runs daily at 11am sun-sat
        function() {
          console.log(
            'Running Send Notifications Worker for ' + moment().format()
          );
          notificationWorker.run();
        },
        null,
        true,
        ''
      );
      new CronJob(
        '00 00 11 * * 1', // runs weekly, 11am on every monday
        function() {
          console.log(
            'Running Send Notifications Worker for ' + moment().format()
          );
          notificationWorker.run();
        },
        null,
        true,
        ''
      );
      new CronJob(
        '00 00 11 2 0-11 *', // runs monthly jan-dec, 11am on day 2
        function() {
          console.log(
            'Running Send Notifications Worker for ' + moment().format()
          );
          notificationWorker.run();
        },
        null,
        true,
        ''
      );
    }
  };
};

module.exports = scheduler();
