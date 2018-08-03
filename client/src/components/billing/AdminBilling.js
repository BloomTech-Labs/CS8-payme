import React, { Component } from 'react';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../actions/auth';
import ConnectStripe from './ConnectStripe';

class AdminBilling extends Component {
  state = {
    quantity: 1,
    description: 'Test',
    type: 'sub',
  };

  toggleRadioButton = ev => {
    // ev.preventDefault();
    console.log(ev.target.value);
    this.setState({ type: ev.target.value });
  };

  updateQuantity = ev => {
    // ev.preventDefault();
    this.setState({ quantity: ev.target.value });
  };

  getSub() {
    const subInMS = this.props.admin.subscription;

    if (new Date().getTime() - subInMS > 0) {
      return 'EXPIRED';
    }

    const date = new Date(subInMS).toDateString();
    return date;
  }

  render() {
    console.log(this.getSub());
    return this.props.admin.stripe && !this.props.admin.stripe.code ? (
      <ConnectStripe />
    ) : (
      <div className="billing-window">
        <h1 className="billing-title">Billing</h1>
        {/* <h3>Sub expires on : {this.getSub()}</h3>
        <h3>Avaliable credits : {this.props.admin.invoiceCredits}</h3>
        <h3>
          Free invoice avaliable :{' '}
          {this.props.admin.invoices && this.props.admin.invoices.length === 0 ? 'Yes' : 'No'}
        </h3> */}
        <h3 className="billing-purchase">Select an option</h3>
        <form>
          <div className="billing-radio">
            <label className="billing-radio_label">
              <input
                className="billing-radio_select"
                type="radio"
                value="sub"
                checked={this.state.type === 'sub'}
                onChange={this.toggleRadioButton}
              />
              30 Days unlimited invoices - $20.00
            </label>
          </div>
          <div className="billing-radio">
            <label className="billing-radio_label">
              <input
                className="billing-radio_select"
                type="radio"
                value="credit"
                checked={this.state.type === 'credit'}
                onChange={this.toggleRadioButton}
              />
              Per invoice - $1.99 each
            </label>
            <div
              className="billing-radio"
              style={{ visibility: this.state.type === 'sub' ? 'hidden' : 'visible' }}
            >
              <label>Quantity: </label>
              <label className="billing-label">
                <input
                  className="billing-quantity_input"
                  type="number"
                  min={1}
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.updateQuantity}
                />
              </label>
            </div>
          </div>
        </form>
        <div className="checkout_button">{this.checkoutButton()}</div>
        {/* <a href={`/stripe/authorize?jwt=${localStorage.getItem('id')}`}>Connect to Stripe</a> */}
      </div>
    );
  }

  checkoutButton = () => {
    const { description } = this.state;
    const email = this.props.admin.username;
    const amount = this.state.type === 'sub' ? 2000 : 199 * this.state.quantity;

    // if (new Date().getTime() - this.props.admin.subscription < 0) {
    //   alert(
    //     'Active subscription.  Invoice credits are not required, and can not be refunded if purchased.',
    //   );
    // }
    const buttonStyle = {
      color: 'white',
      height: '4rem',
      width: '100%',
      border: 'none',
      background: '#E86C62',
      borderRadius: '.5rem',
      backgroundImage: 'none',
    };
    const label = () => {
      if (this.state.type === 'sub') {
        return '30 days for $20';
      }
      const price = (amount / 100).toFixed(2).toString();
      return `${this.state.quantity} credits -- $${price}`;
    };

    return (
      <StripeCheckout
        style={{ ...buttonStyle }}
        textStyle={{ ...buttonStyle }}
        label={label()}
        name="payMe"
        email={email}
        allowRememberMe={false}
        description={description}
        amount={amount}
        token={this.onToken(amount, description)}
        currency="USD"
        stripeKey={process.env.STRIPE_PK || 'pk_test_ILI7ZfrCQbKaNU5WAVRa6yg6'}
      />
    );
  };

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
