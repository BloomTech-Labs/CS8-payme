const CronJob = require('cron').CronJob;
const notify = require('./notificationWorker.js');
const moment = require('moment');
const Reminder = require('./models/Reminder.js');
const schedule = require('node-schedule');
const sender = require('./sender');
// start: function() {
//   new CronJob('* * * * * * ', function scheduleSMS(reminder) {
//     // let rule = new schedule.RecurrenceRule();
//     let job = schedule.scheduleJob(new Date(reminder.time), function() {
//       notify.minuteWorker.run();
//     });
//   });
// },

const scheduler = function() {
  return {
    scheduleSMS: function(reminder) {
      if (reminder.remind === 'daily') {
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 13;
        rule.minute = 30;

        let job = schedule.scheduleJob(rule, function() {
          console.log('sent at ' + moment().format());
          sender.sendSMS(reminder);
        });
      }
    },

    cancelSMS: function(reminderid) {
      job.cancel();
    },
    // scheduleSMS: function(reminder) {
    //   new CronJob(
    //     new Date(reminder.time),
    //     function() {
    //       console.log('Running send at ' + moment().format());
    //       notify.minuteWorker.run();
    //     },
    //     null,
    //     true,
    //     ''
    //   );
    //   new CronJob(
    //     '00 09 23 * * * ', // runs everyday
    //     function() {
    //       console.log('Running send at ' + moment().format());
    //       notify.dailyWorker.run();
    //     },
    //     null,
    //     true,
    //     ''
    //   );
    //   new CronJob(
    //     '00 12 * * * mon ', // runs every week, noon on mondays
    //     function() {
    //       console.log('Running send at ' + moment().format());
    //       notify.weeklyWorker.run();
    //     },
    //     null,
    //     true,
    //     ''
    //   );
    //   new CronJob(
    //     '00 12 * 1 * * ', // runs monthly at noon every 1st
    //     function() {
    //       console.log('Running send at ' + moment().format());
    //       notify.monthlyWorker.run();
    //     },
    //     null,
    //     true,
    //     ''
    //   );
  };
};
module.exports = scheduler();
