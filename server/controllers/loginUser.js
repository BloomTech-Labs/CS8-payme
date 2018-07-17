const express= require('express')
const router = express.Router() ;
const User = require('../../models/users')
const { makeToken } = require('../auth')

router.post('/', authenticate, (req, res) => {
  const { _id, username } = req.user;
  const tknUser = { _id, username }
  const token = makeToken(tknUser);
  
})