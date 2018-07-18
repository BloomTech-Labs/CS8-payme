const { register } = require('../controllers/user/registerUser');
const { login, checkToken } = require('../controllers/user/loginUser');
const { changePassword } = require('../controllers/user/changePassword');
const { addInvoice } = require('../controllers/invoice/newInvoice');
const {
  getAllInvoices,
  getOneInvoice,
} = require('../controllers/invoice/getInvoice');
const { deleteInvoice } = require('../controllers/invoice/deleteInvoice');
const { updateInvoice } = require('../controllers/invoice/updateInvoice');

const { restricted, authenticate } = require('../config/auth');

const { createReminder } = require('../controllers/sendText');

module.exports = app => {
  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
  app.post('/api/sms', restricted, createReminder);
  app.get('/api/login', restricted, checkToken);
  app.post('/api/changepassword', restricted, changePassword);
  app.post('/api/addinvoice', restricted, addInvoice);
  app.get('/api/invoices', restricted, getAllInvoices);
  app.get('/api/invoices/:number', restricted, getOneInvoice);
  app.delete('/api/deleteinvoice/:number', restricted, deleteInvoice);
  app.put('/api/updateinvoice/:invNumber', restricted, updateInvoice);
};
