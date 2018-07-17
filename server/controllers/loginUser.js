const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { makeToken } = require('../config/auth');

const login = (req, res) => {
  console.log('in login');
  const { _id, username } = req.user;
  const tknUser = { _id, username };
  const token = makeToken(tknUser);
  User.findOne(_id)
    .select('-password')
    .then(user => {
      res.json({ token, user });
    });
};

module.exports = {
  login,
};
