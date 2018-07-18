const express = require('express');
const Invoice = require('../../models/invoices');
const User = require('../../models/users');

const getAllInvoices = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .select('-password')
    .populate('invoices'),
    TouchEvent(user => {
      res.json({ invoices: user.invoices });
    }).catch(err => res.send(500).json(err));
};
