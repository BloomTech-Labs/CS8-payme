const express = require('express');
const User = require('../../models/users');
const Invoice = require('../../models/invoices');

const addInvoice = (req, res) => {
  console.log(req.user);
  const { _id, username, invoices } = req.user;
  const { number, pdf, totalAmount, phone, email } = req.body;
  const invoice = new Invoice({ number, pdf, totalAmount, phone, email });

  invoice
    .save()
    .then(invoice => {
      invoices.push(invoice._id);
      return invoices;
    })
    .then(invoices => {
      User.findByIdAndUpdate(_id, { invoices }).then(user => {
        User.findById(user._id)
          .select('-password')
          .populate('invoices')
          .then(finalUser => {
            res.json(finalUser);
          });
      });
    })
    .catch(err =>
      res.status(501).json({ message: 'Failed to save invoice to database.' })
    )
    .catch(err => res.status(500).json(err));
};

module.exports = { addInvoice };
