import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { updateInvoice } from '../../actions/invoices';


class UpdateInvoice extends Component {
  handleFormSubmit = (credentials) => {
    const pdf = new FormData();
    pdf.append('file', this.uploadInput.files[0]);
    pdf.append('filename', 'this.fileName.value');

    this.props.updateInvoice({ ...credentials, pdf }, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="invoice-update">
        <div className="invoice-update-form">
          <h1 className="invoice-update-title">Update Invoice</h1>
          <form className="add-invoice" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div className="invoice-update-flex">
              <p>Client Name</p>
              <Field
                name="clientName"
                component="input"
                className="invoice-update_field"
                placeholder="Name"
              />
            </div>
            <div className="invoice-update-flex">
            <p>Company Name</p>
              <Field
                name="companyName"
                component="input"
                className="invoice-update_field"
                placeholder="Company"
              />
            </div>
            <div className="invoice-update-flex">
            <p>Email</p>
              <Field
                type="email"
                name="email"
                component="input"
                className="invoice-update_field"
                placeholder="Email"
              />
            </div>
            <div className="invoice-update-flex">
            <p>Phone Number</p>
              <Field
                name="phone"
                component="input"
                className="invoice-update_field"
                placeholder="Phone Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Invoice Number</p>
              <Field
                type="number"
                name="number"
                component="input"
                className="invoice-update_field"
                placeholder="Invoice Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Total Amount</p>
              <Field
                type="number"
                name="totalAmount"
                component="input"
                className="invoice-update_field"
                placeholder="Invoice Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>PDF</p>
              <input className="invoice-update_field--pdf"ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Desired name of file" />
              <input
                // component="input"
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={(ref) => { this.uploadInput = ref; }}
                className="invoice-update_field--pdf_input"
                placeholder="Upload PDF"
              />
            </div>
            <button
              className="invoice-update_submit"
              type="submit"
              value="Submit"
            >Update Invoice
            </button>
          </form>
        </div>
      </div>
    );
  }
}


// This retrieving existing data from Redux 
let InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // unique name for form
  enableReinitialize : true
})(UpdateInvoice);

InitializeFromStateForm = connect(
  state => ({
    profile: state.profile,
    initialValues: {
      ...state.invoice.currentInvoice,
      email: state.invoice.currentInvoice.email ? state.invoice.currentInvoice.email.address : '', // Had to add email and phone because they are nested objects
      phone: state.invoice.currentInvoice.phone ? state.invoice.currentInvoice.phone.number : '',
    }, // gathering our intial values and conencting it to comp
  }),
  { updateInvoice },
)(InitializeFromStateForm);

export default withRouter(InitializeFromStateForm);
