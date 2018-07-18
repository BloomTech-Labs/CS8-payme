const express = require('express');
const User = require('../../models/users');
const { makeToken } = require('../../config/auth');

const changePassword = (req, res) => {
  const { _id, username } = req.user;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res
      .status(422)
      .json({ message: 'Please provide current and new passwords.' });
  }
  const token = makeToken({ _id, username });
  User.findById(_id)
    .then(user => {
      // Checks current password for additional verification before changing the password.
      user.checkPassword(currentPassword, (err, valid) => {
        if (err) {
          return res.status(500).json(err);
        }
        // If the password is valid, changes the password on the user, then saves it.
        // Save Pre hook allows the password to be hashed before being saved on the database.
        if (valid) {
          user.password = newPassword;
          return user.save().then(response => res.json({ token, response }));
        }
        return res.status(403).json({ message: 'Not authorized.' });
      });
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { changePassword };
