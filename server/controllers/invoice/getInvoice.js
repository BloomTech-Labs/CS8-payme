const getAllInvoices = (req, res) => {
  const { invoices } = req.user;
  res.json(invoices);
  // User.findById(_id)
  //   .select('-password')
  //   .populate('invoices')
  //   .then(user => {
  //     res.json({ invoices: user.invoices });
  //   })
  //   .catch(err => res.send(500).json(err));
};

const getOneInvoice = (req, res) => {
  const { invoices } = req.user;
  const { number } = req.params;
  for (invoice of invoices) {
    if (invoice.number === number) {
      return res.json(invoice);
    }
  }
  res.status(404).json({ message: 'Invoice number does not exist.' });
};

module.exports = {
  getOneInvoice,
  getAllInvoices,
};
