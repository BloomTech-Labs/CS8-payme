require('dotenv').load();

const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const Reminder = require('../../models/Reminder');
const Invoice = require('../../models/invoices');
const User = require('../../models/users');

const scheduler = require('../../scheduling/scheduler');

const createReminder = (req, res) => {
  // console.log(req.body);

  const {
    invoiceId,
    rPhone,
    message,
    isEmail,
    email,
    title,
    amount,
    company,
    remind,
    start,
    end,
  } = req.body;

  const reminder = new Reminder({
    invoiceId,
    title,
    phoneNumber: rPhone,
    email,
    message,
    isEmail,
    amount,
    company,
    remind,
    start,
    end,
  });

  const { _id } = req.user;
  const { id } = req.params;

  reminder
    .save()
    .then(newreminder => {
      // console.log(_id);
      User.findByIdAndUpdate(_id, { $addToSet: { reminders: newreminder._id } })
        .populate('reminders')
        .then(user => {
          // res.send(user);
          Invoice.findByIdAndUpdate(id, {
            $addToSet: { reminders: newreminder._id },
          })
            .populate('reminders')
            .then(inv => {
              res.json(newreminder);

              scheduler.scheduleSEND(newreminder); // schedule reminder
            })
            .catch(err => {
              res.json(err);
            });
        }) // user catch
        .catch(err => {
          res.json(err);
        });
    }) // reminder catch
    .catch(err => {
      res.json(err);
    });
};
const allReminders = (req, res) => {
  const { reminders } = req.user;
  res.json(reminders);
};

const getReminder = (req, res) => {
  const { id } = req.params;
  Reminder.findOne({ _id: id })
    .then(reminder => {
      res.json(reminder);

      console.log('this was deleted');
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const deleteReminder = (req, res) => {
  const { invoiceId, reminderId } = req.query;
  const { _id } = req.user;
  // console.log(req.query);
  // console.log(reminderId);
  // console.log(invoiceId);
  User.findByIdAndUpdate(_id, {
    $pull: { reminders: reminderId },
  })
    .populate('reminders')
    .then(user => {
      Invoice.findByIdAndUpdate(
        invoiceId,
        { $pull: { reminders: reminderId } },
        { new: true }
      )
        .populate('reminders')
        .then(invoice => {
          // console.log('invoice\n', invoice);
          Reminder.findByIdAndRemove(reminderId)
            .then(reminder => {
              // console.log(invoice);
              res.status(200).json(reminder);
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
    })
    .catch(err => {
      res.json(err);
    });
  // res.status(401).json({ message: 'testing' });
};

const cancelSchedule = (req, res) => {
  const { id } = req.params;

  Reminder.findById(id)
    .then(reminder => {
      res.send(reminder);
      scheduler.cancelSEND(reminder._id);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = {
  allReminders,
  getReminder,
  createReminder,
  deleteReminder,
  cancelSchedule,
};
