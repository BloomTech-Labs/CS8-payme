const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const { makeToken } = require('../auth');

// endpoint for these routers is /api/register

router.post('/', (req, res) => {
  const { username, password, phone, firstName, lastName } = req.body;
  let user = {};
  if (!username || !password) {
    res.status(422).json({ message: 'Email and Password are required.' });
  } else {
    user = { username, password, phone, firstName, lastName };
  }

  User.findOne({ username }).then(response => {
    if (!response) {
      const newUser = new User(user);
      newUser
        .save()
        .then(response => {
          const token = makeToken(newUser);
          let ro = { ...response._doc };
          delete ro.password;
          res.json({ token, user: ro });
        })
        .catch(err => {
          res.status(500).json(err); // { message: 'Server Error' });
        });
    } else {
      res.status(403).json({ message: 'Email already exists.' });
    }
  });
});

module.exports = router;
