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

const Agenda = require('agenda');
const agenda = new Agenda();

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
  isEmail: {
    type: Boolean,
    default: false,
  },
  remind: {
    type: String,
    default: 'weekly',
  }, // minute, daily, weekly, monthly
  days: {
    type: Date,
    default: Date.now(),
  },
});

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
