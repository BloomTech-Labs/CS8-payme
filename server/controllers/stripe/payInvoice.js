const stripe = require('stripe')(process.env.STRIPE_SK);
const Invoice = require('../../models/invoices');

const payInvoice = async function(req, res) {
  try {
    const { amount, invoiceId, id, description } = req.body;
    let { status } = await stripe.charges.create({
      amount,
      currency: 'usd',
      description,
      source: id,
    });
    if (status === 'successful') {
      Invoice.findByIdAndUpdate(invoiceId, { isPaid: true }).then(invoice => {
        res.json({ status, invoice });
      });
    } else {
      res.json({ status });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { payInvoice };
