import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class CheckoutModal extends Component {
  render() {
    return (
      <div className="window">
        <div className="modal">
          <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
            <div className="example">
              <h1>React Stripe Elements Example</h1>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        </div>
      </div>
    );
  }
}

export default CheckoutModal;
