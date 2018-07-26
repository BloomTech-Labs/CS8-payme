const { register } = require('../controllers/user/registerUser');
const { login, checkToken } = require('../controllers/user/loginUser');
const { changePassword } = require('../controllers/user/changePassword');
const { addInvoice } = require('../controllers/invoice/newInvoice');
const {
  getAllInvoices,
  getOneInvoice,
  clientInvoice,
  getpdf,
} = require('../controllers/invoice/getInvoice');
const { deleteInvoice } = require('../controllers/invoice/deleteInvoice');
const { updateInvoice } = require('../controllers/invoice/updateInvoice');

const { restricted, authenticate } = require('../config/auth');
const { sendEmail } = require('../controllers/sendEmail');

const {
  createReminder,
  getReminder,
  deleteReminder
} = require('../controllers/sendText');

const { stripeCharge } = require('../controllers/stripe/stripeCharge');
const { payInvoice } = require('../controllers/stripe/payInvoice');

module.exports = app => {
  // USER ROUTES
  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
  app.get('/api/login', restricted, checkToken);
  app.post('/api/changepassword', restricted, changePassword);
  // INVOICE ROUTES
  app.post('/api/addinvoice', restricted, addInvoice);
  app.get('/api/invoices', restricted, getAllInvoices);
  app.get('/api/invoices/:number', restricted, getOneInvoice);
  app.delete('/api/deleteinvoice/:number', restricted, deleteInvoice);
  app.put('/api/updateinvoice/:invNumber', restricted, updateInvoice);
  app.get('/api/clientinvoice/:invoiceID', clientInvoice);
  app.get('/api/getpdf/:id', getpdf);
  // EMAIL ROUTES
  app.post('/api/email', restricted, sendEmail);
  // SMS ROUTES
  app.post('/api/sms/:id', restricted, createReminder);
  app.post('/api/deletesms/:id', restricted, deleteReminder);
  app.get('/api/sms/:id', restricted, getReminder);
  // STRIPE ROUTES
  app.post('/api/charge', restricted, stripeCharge);
  app.post('/api/payinvoice', payInvoice);
};
