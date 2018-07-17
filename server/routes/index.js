const { register } = require('../controllers/user/registerUser');
const { login, checkToken } = require('../controllers/user/loginUser');
const { changePassword } = require('../controllers/user/changePassword');
const { addInvoice } = require('../controllers/invoice/newInvoice');

const { restricted, authenticate } = require('../config/auth');

const { createReminder } = require('../controllers/sendText');

module.exports = app => {
  app.get('/', (req, res) => {
    res.json({ message: 'API running successfully! YAY!' });
  });

  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
  app.post('/api/sms', restricted, createReminder);
  app.get('/api/login', restricted, checkToken);
  app.post('/api/changepassword', restricted, changePassword);
  app.post('/api/addinvoice', restricted, addInvoice);
};
