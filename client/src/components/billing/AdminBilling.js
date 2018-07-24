import React, { Component } from 'react';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../actions/auth';

class AdminBilling extends Component {
  state = {
    amount: 199,
    description: 'Test',
  };

  render() {
    console.log(this.props.admin);
    const { amount, description } = this.state;
    const email = this.props.admin.username;
    return (
      <div className="window" style={{ display: 'flex' }}>
        <div
          className="modal"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
        >
          <StripeCheckout
            name="payMe"
            email={email}
            allowRememberMe={false}
            description={description}
            amount={amount}
            token={this.onToken(amount, description)}
            currency="USD"
            stripeKey={process.env.STRIPE_PK || 'pk_test_ILI7ZfrCQbKaNU5WAVRa6yg6'}
          />
        </div>
      </div>
    );
  }

  onToken = (amount, description) => token => axios
    .post('/api/charge', {
      description,
      source: token.id,
      currency: 'USD',
      amount,
    })
    .then(res => {
      alert('Payment successful');
      this.props.updateUser(res.data.user);
      console.log(res);
    })
    .catch(data => {
      alert('Payment declined');
      console.log(data);
    });
}
const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
  };
};

export default connect(
  mapStateToProps,
  { updateUser },
)(AdminBilling);
