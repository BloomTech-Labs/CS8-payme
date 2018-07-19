import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class AdminBilling extends Component {
  render() {
    return (
      <div className="window" style={{ display: 'flex' }}>
        <div
          className="modal"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
        >
          <StripeProvider apiKey={process.env.STRIPE_KEY || 'pk_test_LwL4RUtinpP3PXzYirX2jNfR'}>
            <div className="example">
              <p>this is a test</p>
              <div>another test</div>
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

export default AdminBilling;
