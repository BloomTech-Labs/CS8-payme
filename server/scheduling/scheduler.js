const schedule = require('node-schedule');
const sender = require('./reminderApi');

const scheduler = function() {
  return {
    scheduleSEND: function(reminder) {
      /**********************************
        Break down date object 
      */
      const initialSend = new Date(reminder.start);
      const startNumb = initialSend.getDay(); // 0-6 starts at sunday
      const startDay = initialSend.getDate(); // 1-31
      const startHour = initialSend.getHours();
      const startMinute = initialSend.getMinutes();
      const startMonth = initialSend.getMonth();

      const lastSend = new Date(reminder.end);
      const endNumb = lastSend.getDay();
      const endDay = lastSend.getDate();
      const endHour = lastSend.getHours();
      const endMinute = lastSend.getMinutes();
      const endMonth = lastSend.getMonth();
      /*********************************/

      const remId = reminder._id.toString();

      /***********************************
       * CUSTOM scheduler
       */
      if (reminder.remind === 'custom') {
        // let rule = new schedule.RecurrenceRule();
        let job = schedule.scheduleJob(remId, initialSend, function() {
          console.log('schdler' + reminder);
          reminder.isEmail === true
            ? sender.sendEmail(reminder)
            : sender.sendSMS(reminder);
        });
      }
      /*******************************/

      /***********************************
       * Sends reminder DAILY
       */
      if (reminder.remind === 'daily') {
        // send on day and time selected. Will send sun - sat
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [startNumb, new schedule.Range(0, 6)];
        rule.hour = startHour;
        rule.minute = startMinute + 1;

        let job = schedule.scheduleJob(
          remId,
          { start: initialSend, end: lastSend, rule },
          function() {
            reminder.isEmail === true
              ? sender.sendEmail(reminder)
              : sender.sendSMS(reminder);
          }
        );
      }
      /**********************************/

      /***********************************
       * Sends reminder WEEKLY
       */
      if (reminder.remind === 'weekly') {
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = startNumb;
        rule.hour = startHour || endHour;
        rule.minute = startMinute || endMinute;

        let job = schedule.scheduleJob(
          remId,
          { start: initialSend, end: lastSend, rule },
          function() {
            reminder.isEmail === true
              ? sender.sendEmail(reminder)
              : sender.sendSMS(reminder);
          }
        );
      }
      /**********************************/

      /***********************************
       * Send reminder MONTHLY
       */
      if (reminder.remind === 'monthly') {
        let rule = new schedule.RecurrenceRule();
        rule.month = [startMonth, new schedule.Range(0, 11)];
        rule.dayOfWeek = startNumb || endNumb;
        rule.hour = startHour || endHour;
        rule.minute = startMinute || endMinute;

        let job = schedule.scheduleJob(
          remId,
          { start: initialSend, end: lastSend, rule },
          function() {
            reminder.isEmail === true
              ? sender.sendEmail(reminder)
              : sender.sendSMS(reminder);
          }
        );
      }
      /**********************************/
    },

    /**************************************
     * Call to cancel job by reminder Id
     */
    cancelSEND: function(reminderId) {
      let remId = reminderId.toString();
      let schJob = schedule.scheduledJobs[remId];
      schJob.cancel();
    },
    /**********************************/
  };
};

module.exports = scheduler();
