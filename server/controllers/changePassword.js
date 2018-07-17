const express = require('express');
const User = require('../models/users');
const { makeToken } = require('../config/auth');

const changePassword = (req, res) => {
  const { _id, username } = req.user;
  const { newPassword } = req.body;
  const token = makeToken({ _id, username });
  User.findById(_id)
    .then(user => {
      user.password = newPassword;
      user.save().then(response => res.json({ token, response }));
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { changePassword };
