const mongoose = require('mongoose');
const moment = require('moment');
const Twilio = require('twilio');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const emailusername = process.env.EMAIL_USERNAME;
const emailpassword = process.env.EMAIL_PASSWORD;
const host = process.env.HOST;

const ReminderSchema = new mongoose.Schema({
  invoiceId: String,
  name: String,
  company: String,
  email: String,
  phoneNumber: String,
  message: String,
  amount: {
    type: Number,
  },
  remind: {
    type: String,
    default: 'weekly',
  }, // minute, daily, weekly, monthly
  isEmail: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});
ReminderSchema.method.emailify = function() {
  return this.isEmail === true;
};

ReminderSchema.statics.Minute = function() {
  // this finds any reminder with remind set to every minute
  Reminder.find({ remind: 'minute' }).then(reminders => {
    let emails = reminders.filter(reminder => {
      return reminder.isEmail === true;
    });
    let sms = reminders.filter(reminder => {
      return reminder.isEmail === false;
    });
    sendNotifications(sms);
    sendEmailer(emails);
  });
};
ReminderSchema.statics.Daily = function() {
  Reminder.find({ remind: 'daily' }).then(reminders => {
    let emails = reminders.filter(reminder => {
      return reminder.isEmail === true;
    });
    let sms = reminders.filter(reminder => {
      return reminder.isEmail === false;
    });
    sendNotifications(sms);
    sendEmailer(emails);
  });
};
ReminderSchema.statics.Weekly = function() {
  Reminder.find({ remind: 'weekly' }).then(reminders => {
    let emails = reminders.filter(reminder => {
      return reminder.isEmail === true;
    });
    let sms = reminders.filter(reminder => {
      return reminder.isEmail === false;
    });
    sendNotifications(sms);
    sendEmailer(emails);
  });
};
ReminderSchema.statics.Monthly = function() {
  Reminder.find({ remind: 'monthly' }).then(reminders => {
    let emails = reminders.filter(reminder => {
      return reminder.isEmail === true;
    });
    let sms = reminders.filter(reminder => {
      return reminder.isEmail === false;
    });
    sendNotifications(sms);
    sendEmailer(emails);
  });
};
// **********Function sends SMS***************
function sendNotifications(reminders) {
  const client = new Twilio(accountSid, authToken);
  reminders.forEach(function(reminder) {
    // options for according to each client
    console.log('inside sender', reminder);
    let body;
    if (reminder.message) {
      body = `${reminder.message} Link to pay: ${host}/payinvoice/${
        reminder.invoiceId
      }`;
    } else {
      body = `${
        reminder.company
      } is asking for a payment. You can pay at: ${host}/payinvoice/${
        reminder.invoiceId
      }`;
    }
    const options = {
      to: `+1 ${reminder.phoneNumber}`,
      from: twilioNumber,
      body,
    };
    // send message
    client.messages.create(options, function(err, response) {
      if (err) {
        // just log for now
        console.log(err);
      } else {
        let masked = reminder.phoneNumber.substr(
          0,
          reminder.phoneNumber.length - 5
        );
        masked += '*****';
        // log who it was sent to with asterisk
        console.log(`Message sent to ${masked}`);
      }
    });
  });
  // Don't wait on success/failure, just indicate all messages have been
  // queued for delivery
  // if (callback) {
  //   callback.call();
  // }
}

function sendEmailer(reminders) {
  reminders.forEach(function(reminder) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.log(`${err} Failed at creating test account`);
      }
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: emailusername,
          pass: emailpassword,
        },
      });

      transporter.use(
        'compile',
        hbs({
          viewPath: './server/controllers/email',
          extName: '.hbs',
        })
      );

      if (reminder.email === undefined)
        console.log({ error: 'No email found on Invoice.' });
      // setup email data with unicode symbols
      let mailOptions = {
        from: `"Give Me My Money"${emailusername}`, // sender address
        to: `${reminder.email}`, // list of receivers
        subject: 'You Have An Outstanding Invoice', // Subject line
        template: 'body',
        context: {
          // _______________________________placeholders
          URL: `${host}`,
          invoice: `${reminder.invoiceId}`,
          name: `${reminder.name}`,
          amount: `${reminder.amount}`,
          company: `${reminder.company}`,
        }, // html body
      };
      console.log(`This email is: ${reminder.email}`);
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(` Error sending the Email ${err}`);
        }
        // res.send({
        //   success: 'Email sent',
        //   messageInfo: info,
        //   messageURL: nodemailer.getTestMessageUrl(info),
        // });
        console.log('Message sent');
        // console.log(nodemailer.getTestMessageUrl(info));
      });
    });
  });
}

const Reminder = mongoose.model('Reminder', ReminderSchema);
module.exports = Reminder;
