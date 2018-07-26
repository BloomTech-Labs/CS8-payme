const express = require('express');
const User = require('../../models/users');
const Invoice = require('../../models/invoices');

const addInvoice = (req, res) => {
  const { _id, username, invoices } = req.user;
  const { body } = req;
  const { number } = body;
  console.log(req.files);
  let data = null;
  let contentType = null;
  if (req.files.file) {
    data = req.files.file.data;
    contentType = req.files.file.mimetype;
  }
  const invoice = new Invoice({
    ...body,
    admin: _id,
    email: {
      address: body.email,
    },
    phone: {
      number: body.phone,
    },
    img: { data, contentType },
  });
  // Checks to see if the current user already has this invoice number in use.
  console.log('test', invoice.number);
  const invoiceNumbers = invoices.map(invoice => invoice.number);

  if (invoiceNumbers.includes(number)) {
    return res.status(422).json({ message: 'Invoice number already exists.' });
  }

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
    .catch(err => res.status(500).json(err));
};

module.exports = { addInvoice };
