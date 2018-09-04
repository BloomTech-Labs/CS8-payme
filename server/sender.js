const Twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const host = process.env.HOST;

const send = {
  sendSMS: function(reminder) {
    const client = new Twilio(accountSid, authToken);
    // reminders.forEach(function(reminder) {
    // options for according to each client
    console.log('inside sender', reminder.message);
    let body = `PAy me`;
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
      to: `+1${reminder.phoneNumber}`,
      from: twilioNumber,
      body,
    };
    // send message
    client.messages.create(options, function(err, response) {
      if (err) {
        // just log for now
        console.log(err);
      }
      if (response) {
        let masked = reminder.phoneNumber.substr(
          0,
          reminder.phoneNumber.length - 5
        );
        masked += '*****';
        // log who it was sent to with asterisk
        console.log(`Message sent to ${masked}`);
      }
    });
    // });
  },
};

module.exports = send;
