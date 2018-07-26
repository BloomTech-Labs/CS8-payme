const { register } = require('../controllers/user/registerUser');
const { login, checkToken } = require('../controllers/user/loginUser');
const { changePassword } = require('../controllers/user/changePassword');
const { updateStripeInfo } = require('../controllers/user/updateUser');

const { addInvoice } = require('../controllers/invoice/addInvoice');
const {
  getAllInvoices,
  getOneInvoice,
  clientInvoice,
} = require('../controllers/invoice/getInvoice');
const { deleteInvoice } = require('../controllers/invoice/deleteInvoice');
const { updateInvoice } = require('../controllers/invoice/updateInvoice');

const { restricted, authenticate } = require('../config/auth');
const { sendEmail } = require('../controllers/sendEmail');

const {
  createReminder,
  getReminder,
  deleteReminder,
} = require('../controllers/sendText');

const {
  authorizeConnect,
  connectToken,
} = require('../controllers/stripe/connect');

const { stripeCharge } = require('../controllers/stripe/stripeCharge');
const { payInvoice } = require('../controllers/stripe/payInvoice');

function userRequired(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res.redirect('/');
  // }
  next();
}

module.exports = app => {
  // USER ROUTES
  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
  app.get('/api/login', restricted, checkToken);
  app.post('/api/changepassword', restricted, changePassword);
  // app.post('/api/usi', restricted, updateStripeInfo);
  // INVOICE ROUTES
  app.post('/api/addinvoice', restricted, addInvoice);
  app.get('/api/invoices', restricted, getAllInvoices);
  app.get('/api/invoices/:number', restricted, getOneInvoice);
  app.delete('/api/deleteinvoice/:number', restricted, deleteInvoice);
  app.put('/api/updateinvoice/:invNumber', restricted, updateInvoice);
  app.get('/api/clientinvoice/:invoiceID', clientInvoice);
  // EMAIL ROUTES
  app.post('/api/email', restricted, sendEmail);
  // SMS ROUTES
  app.post('/api/sms', restricted, createReminder);
  app.post('/api/deletesms/:id', restricted, deleteReminder);
  app.get('/api/sms/:id', restricted, getReminder);
  // STRIPE ROUTES
  app.post('/api/charge', restricted, stripeCharge);
  app.post('/api/payinvoice', payInvoice);
  //Stripe Connect
  app.get('/stripe/authorize', restricted, authorizeConnect);
  app.get('/stripe/token', connectToken);
};
