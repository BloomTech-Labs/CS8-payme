require('dotenv').load();

const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const myNumber = process.env.MY_NUMBER;
const client = new twilio(accountSid, authToken);

const Reminder = require('../models/Reminder');

// Just sends a POST request message to myNumber
const createReminder = (req, res) => {
  const reminder = new Reminder(req.body);
  reminder
    .save()
    .then(newReminder => {
      client.messages
        .create({
          body: `Hi soso, your due date is`,
          to: `${myNumber}`,
          from: twilioNumber
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log('error here:', err));
      res.status(200).json(newReminder);
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

module.exports = {
  createReminder
};
