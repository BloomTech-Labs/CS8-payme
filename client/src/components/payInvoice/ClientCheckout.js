import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { addSub, addCredit } from '../../actions/stripe';

class ClientCheckout extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      amount: 50,
    };
  }

  async submit(ev) {
    const { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token.id);

    axios
      .post('http://localhost:5000/api/payinvoice', {
        id: token.id,
        description: 'Placeholder desctiption',
        amount: 2000,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Pay</button>
      </div>
    );
  }
}

export default injectStripe(ClientCheckout);
