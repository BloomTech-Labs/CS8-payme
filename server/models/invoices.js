const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');

mongooseTypes.loadTypes(mongoose, 'email');

const { Email } = mongoose.Schema.Types;

const Invoice = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
      required: true,
    },
    pdf: Array,
    totalAmount: {
      type: Number,
      required: true,
    },
    phone: {
      number: Number,
      frequency: String,
    },
    email: {
      address: Email,
      frequency: String,
      // mailOptions: {
      //   from: String, // sender address
      //   to: String, // list of receivers
      //   subject: String, // Subject line
      //   text: String, // plain text body
      //   html: String, // html body
      // },
    },
  },
  {
    timestamps: true,
  }
);


ReminderSchema.statics.sendNotifications = function(callback) {
  Reminder.find()
    .then(function(reminders) {
      console.log("inside sendnotifications");
      const searchDate = new Date();
      reminders = reminders.filter(reminder => {
        return reminder.requiresNotification(searchDate);
      });
      if (reminders.length > 0) {
        sendNotifications(reminders);
      }
    })
    .catch(err => {
      console.log(err);
    });

  // reminders array
  function sendNotifications(reminders) {
    const client = new Twilio(accountSid, authToken);
    reminders.forEach(function(reminder) {
      // options for according to each client
      console.log('inside sender', reminder);
      const options = {
        to: `+1 ${reminder.phoneNumber}`,
        from: twilioNumber,
        body: reminder.message
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
    if (callback) {
      callback.call();
    }
  }
};


switch (action.type) {
  case USER:
    return { ...state, admin: action.payload };
  case DE_AUTH:
    return { ...state, invoices: [] };
  case AUTHENTICATION_ERROR:
    return { ...state, message: action.payload };
  case AUTH_SUCCESS:
    return { ...state, success: action.payload };
  default:
    return state;
}

module.exports = mongoose.model('Invoice', Invoice);
