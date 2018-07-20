const User = require('../../models/users');

const addSub = req => {
  const { _id } = req.user;
  const currentTime = new Date().getTime();
  const subLength = 1000 * 60 * 60 * 24 * 30; // 30 days in MilliSeconds
  return User.findById(_id)
    .select('-password')
    .then(user => {
      if (currentTime - user.subscription < 0) {
        user.subscription += subLength;
      } else {
        user.subscription = currentTime + subLength;
      }
      user
        .save()
        .then(response => {
          const ro = { ...response._doc };
          delete ro.password;
          return ro;
        })
        .catch(err => err);
    });
};

module.exports = { addSub };
