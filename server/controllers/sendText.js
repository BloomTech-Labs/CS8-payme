require('dotenv').load();

const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const Reminder = require('../models/Reminder');
const Invoice = require('../models/invoices');
const User = require('../models/users');

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// POST: /api/sms create a reminder
const createReminder = (req, res) => {
  console.log(req.body);
  const {
    remind,
    invoiceId,
    rPhone,
    message,
    isEmail,
    email,
    name,
    amount,
    company,
  } = req.body;
  // const remind = moment(req.body.remind, 'MM-DD-YYYY hh:mm-400');
  const reminder = new Reminder({
    invoiceId,
    name,
    phoneNumber: rPhone,
    email,
    message,
    remind,
    isEmail,
    amount,
    company,
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
  Reminder.find({}).then(reminders => {
    res.json(reminders);
  });
};

const setofReminders = (req, res) => {
  const { id } = req.params;
  Invoice.findById(id)
    .then(invoice => {
      Reminder.find({ invoiceId: invoice._id })
        .then(reminders => {
          res.send(reminders);
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
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
  const { invoiceId, reminderId } = req.query;
  // const { _id } = req.user;
  console.log(req.query);
  console.log(reminderId);
  console.log(invoiceId);

  Invoice.findByIdAndUpdate(
    invoiceId,
    { $pull: { reminders: reminderId } },
    { new: true }
  )
    .populate('reminders')
    .then(invoice => {
      console.log('invoice\n', invoice);
      Reminder.findByIdAndRemove(reminderId)
        .then(() => {
          // console.log(invoice);
          res.json(invoice.reminders);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // res.status(401).json({ message: 'testing' });
};

module.exports = {
  allReminders,
  getReminder,
  createReminder,
  deleteReminder,
};
