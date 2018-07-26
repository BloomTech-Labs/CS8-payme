const Reminder = require('./models/Reminder.js');

const minuteWorker = function() {
  return {
    run: function() {
      Reminder.Minute();
    }
  };
};

const dailyWorker = function() {
  return {
    run: function() {
      Reminder.Daily();
    }
  };
};
const weeklyWorker = function() {
  return {
    run: function() {
      Reminder.Weekly();
    }
  };
};
const monthlyWorker = function() {
  return {
    run: function() {
      Reminder.Monthly();
    }
  };
};

module.exports = {
  minuteWorker: minuteWorker(),
  dailyWorker: dailyWorker(),
  weeklyWorker: weeklyWorker(),
  monthlyWorker: monthlyWorker()
};
