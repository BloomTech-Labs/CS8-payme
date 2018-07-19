import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    const { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log(token.id);
    // const response = await fetch('/charge', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'text/plain' },
    //   body: token.id,
    // });

    // if (response.ok) console.log('Purchase Complete!');
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
