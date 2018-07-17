const { login, register } = require('../controllers/registerUser');

module.exports = (app) => {
app.get('/', (req, res) => {
  res.json({ message: 'API running successfully! YAY!' });
});

app.post('/api/register', register);
// app.post('/api/login', login);

}