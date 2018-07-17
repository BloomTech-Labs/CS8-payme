const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
const bcrypt = require('bcrypt');

mongooseTypes.loadTypes(mongoose, 'email');

const { Email } = mongoose.Schema.Types;
const { ObjectId } = mongoose.Schema.Types;

const SALT_ROUNDS = 11;

const User = new mongoose.Schema(
  {
    // E-mail address is used as a username
    username: {
      type: Email,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subscription: {
      type: String,
      default: 'perdiem',
    },
    invoice: { type: ObjectId, ref: 'Invoice' },
  },
  {
    timestamps: true,
  }
);

User.pre('save', function(next) {
  if (this.password !== null) {
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  }
});

User.methods.checkPassword = function(pw, callBack) {
  return bcrypt.compare(pw, this.password, function(err, valid) {
    if (valid) return callBack(null, valid);
    return callBack(err);
  });
};

module.exports = mongoose.model('User', User);
