const User = require('../../models/users');
const Invoice = require('../../models/invoices');

const deleteInvoice = (req, res) => {
  const { _id, invoices } = req.user;
  const { number } = req.params;
  const newInvoices = invoices.filter(invoice => invoice.number != number);

  if (newInvoices.length === invoices.length) {
    return res.status(404).json({ message: 'Invoice not found.' });
  }

  User.findOneAndUpdate(
    { _id },
    { invoices: newInvoices },
    { returnNewDocument: true }
  )
    .select('-password')
    .populate('invoices')
    .then(() => {
      Invoice.findOneAndRemove({ number })
        .then(() => {
          User.findById(_id)
            .select('-password')
            .populate('invoices')
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
};

module.exports = { deleteInvoice };
