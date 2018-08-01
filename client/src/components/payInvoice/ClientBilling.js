import React, { Component } from 'react';
// import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// import ClientCheckout from './ClientCheckout';
import NoInvoice from './noInvoice';
import PaidInvoice from './paidInvoice';

class ClientBilling extends Component {
  state = {
    invoice: false,
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/clientinvoice/${id}`)
      .then(response => {
        const invoice = response.data;
        this.setState({ invoice });
      })
      .catch(err => this.setState({ invoice: false }));
  }

  onToken = (amount, description) => token => {
    console.log(this.state.invoice);

    return axios
      .post('/api/payinvoice', {
        code: this.state.invoice.admin.stripe.code,
        scope: this.state.invoice.admin.stripe.scope,
        description,
        source: token.id,
        currency: 'USD',
        amount,
        invoiceId: this.state.invoice._id,
      })
      .then(res => {
        alert('Payment successful');
        this.setState({ invoice: res.data.invoice });
        console.log(res);
      })
      .catch(data => {
        alert('Payment declined');
        console.log(data);
      });
  };

  render() {
    if (!this.state.invoice) {
      return <NoInvoice invoice={this.props.match.params.id} />;
    }
    if (this.state.invoice.isPaid) {
      return <PaidInvoice invoice={this.state.invoice} />;
    }
    // return console.log(this.state);
    const { totalAmount, number } = this.state.invoice
      ? this.state.invoice
      : { amount: null, number: null };
    const description = this.state.invoice ? `GMMM invoice ${number}` : 'no invoice';
    let email;
    if (this.state.invoice && this.state.invoice.email) {
      email = this.state.invoice.email.address;
    }
    return (
      <div className="window" style={{ display: 'flex', marginTop: '15rem' }}>
        <div
          className="payInvoice"
          style={{ justifyContent: 'center', alignItems: 'center', margin: 'auto' }}
        >
          <h1 className="signin--box--title" style={{ marginBottom: '5rem' }}>
            payMe
            <span className="signin--box--dot">.</span>
            <br />
          </h1>
          <div
            style={{
              border: '1px solid black',
              textAlign: 'center',
            }}
          >
            <h1 style={{ border: '1px solid black' }}>Invoice # {this.state.invoice.number}</h1>
            <h1 style={{ border: '1px solid black' }}>
              From: {this.state.invoice.companyName || this.state.invoice.fullName}
            </h1>
            <h1 style={{ border: '1px solid black' }}>
              Amount Due: {this.state.invoice.totalAmount}
            </h1>
          </div>
          <div>
            <a id="openPDF" href={`viewpdf/${this.state.invoice._id}`} target="_blank">
              <button className="doc-content_button">Download</button>
            </a>
          </div>
          <div>
            <StripeCheckout
              name="Name"
              email={email}
              allowRememberMe={false}
              description={description}
              amount={totalAmount}
              token={this.onToken(totalAmount, description)}
              currency="USD"
              stripeKey={process.env.STRIPE_PK || 'pk_test_ILI7ZfrCQbKaNU5WAVRa6yg6'}
            />
          </div>
        </div>
      </div>
    );

    // return this.state.invoice ? this.hasInvoice() : <div />;
  }
}

// const Checkout = ({ name, description, amount }) => (
//   <StripeCheckout
// name={name}
// description={description}
// amount={amount}
// token={onToken(amount, description)}
// currency={CURRENCY}
// stripeKey="pk_test_GrN1cUmXTG8g6u5D9sFoRUgp"
//   />
// );

export default ClientBilling;
