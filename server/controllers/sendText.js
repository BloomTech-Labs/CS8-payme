require('dotenv').load();

const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const Reminder = require('../models/Reminder');
const Invoice = require('../models/invoices');

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// POST: /api/sms create a reminder
const createReminder = (req, res) => {
  const { name, phoneNumber, message, remind } = req.body;
  // const remind = moment(req.body.remind, 'MM-DD-YYYY hh:mm-400');
  const reminder = new Reminder({
    name: name,
    phoneNumber: phoneNumber,
    message: message,
    remind: remind
  });
  const { id } = req.params;
  reminder.save().then(newreminder => {
    console.log(newreminder);
    Invoice.findByIdAndUpdate(id, { $addToSet: { reminders: newreminder._id } })
      .populate('reminders')
      .then(newinvoice => {
        res.send(newinvoice);
      });
  });
};
// GET: /api/sms/:id
// if reminder was deleted, it will redirect back to create
const getReminder = (req, res) => {
  const { id } = req.params;
  Reminder.findOne({ _id: id })
    .then(reminder => {
      // if (reminder) {
      res.json(reminder);
      // }
      // res.redirect('/api/sms');
      console.log('this was deleted');
    })
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
};
// POST: /api/deletesms/:id
const deleteReminder = (req, res) => {
  const { id } = req.params;

  Reminder.findById({ _id: id })
    .remove()
    .then(reminder => {
      res.json(reminder);
      // res.redirect('/');
      console.log('deleted');
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = {
  getReminder,
  createReminder,
  deleteReminder
};
