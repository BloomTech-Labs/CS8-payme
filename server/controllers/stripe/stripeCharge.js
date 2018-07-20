const stripe = require('stripe')(process.env.STRIPE_SK);
// const addSub = require('./addSub');
const User = require('../../models/users');

const stripeCharge = async function(req, res) {
  try {
    // console.log(req.body);
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id,
    });

    const user = await addSub(req);
    console.log('1 :', user);
    res.json({ status });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

async function addSub(req) {
  const { _id } = req.user;
  const currentTime = new Date().getTime();
  const subLength = 1000 * 60 * 60 * 24 * 30; // 30 days in MilliSeconds
  const rv = await User.findById(_id)
    .select('-password')
    .then(user => {
      let subscription = user.subscription;
      if (currentTime - subscription < 0) {
        subscription += subLength;
      } else {
        subscription = currentTime + subLength;
      }
      return User.findByIdAndUpdate(_id, { subscription })
        .select('-password')
        .populate('invoices')
        .then(user => user)
        .catch(err => err);

      // user
      //   .save()
      //   .then(response => {
      //     const ro = { ...response._doc };
      //     delete ro.password;
      //     return ro;
      //   })
      //   .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  console.log(' rv:   ', rv);
  return rv;
}

module.exports = { stripeCharge };
