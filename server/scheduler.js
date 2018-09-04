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
      /**********************************
        Break down date object 
      */
      let initialSend = new Date(reminder.days);
      let startNumb = initialSend.getDay(); // 0-6 starts at sunday
      let startDate = initialSend.getDate(); // 1-31
      let startHour = initialSend.getHours();
      let startMinute = initialSend.getMinutes();
      let startMonth = initialSend.getMonth();

      /***********************************
       * Sends reminder daily
       */
      if (reminder.remind === 'daily') {
        // send on day and time selected and will send sun - sat
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [startNumb, new schedule.Range(0, 6)];
        rule.hour = startHour;
        rule.minute = startMinute;

        let dailyJob = schedule.scheduleJob(rule, function() {
          console.log('sent at ' + moment().format());
          sender.sendSMS(reminder);
        });
      }
      /***********************************
       * Sends reminder weekly
       */
      if (reminder.remind === 'weekly') {
        // Sends 11:30am every week on selected day
        let weeklyJob = schedule.scheduleJob(
          { hour: 11, minute: 30, dayOfWeek: startNumb },
          function() {
            sender.sendSMS(reminder);
          }
        );
        // let rule = new schedule.RecurrenceRule();
      }
      /***********************************
       * Send reminder monthly
       */
      if (reminder.remind === 'monthly') {
        let rule = new schedule.RecurrenceRule();
        rule.month = [startMonth, new schedule.Range(0, 11)];
        rule.hour = startHour;
        rule.minute = startMinute;

        let monthlyJob = schedule.scheduleJob(rule, function() {
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
