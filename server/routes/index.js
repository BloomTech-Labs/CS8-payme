const { register } = require('../controllers/registerUser');
const { login } = require('../controllers/loginUser');

const { restricted, authenticate } = require('../config/auth');

module.exports = app => {
  app.get('/', (req, res) => {
    res.json({ message: 'API running successfully! YAY!' });
  });

  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
};
