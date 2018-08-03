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
  console.log(req.body);
  const { option, id, rPhone, message, isEmail, email } = req.body;
  // const remind = moment(req.body.remind, 'MM-DD-YYYY hh:mm-400');
  const reminder = new Reminder({
    invoiceId: id,
    phoneNumber: rPhone,
    email: email,
    message: message,
    remind: option,
    isEmail: isEmail,
  });
  const { _id } = req.params;
  reminder.save().then(newreminder => {
    console.log(newreminder);
    Invoice.findByIdAndUpdate(_id, {
      $addToSet: { reminders: newreminder._id },
    })
      .populate('reminders')
      .then(newinvoice => {
        res.send(newinvoice);
      });
  });
};

const allReminders = (req, res) => {
  Reminder.find().then(reminders => {
    res.json(reminders);
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
  allReminders,
  getReminder,
  createReminder,
  deleteReminder,
};
