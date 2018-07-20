import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { updateInvoice } from '../../actions';
import Sidebar from '../sidebar';

class UpdateInvoice extends Component {
  state = { }

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
              <p>Paid</p>
              <Field
                type="number"
                name="totalAmount"
                component="input"
                className="invoice-update_field"
                placeholder="Total Amount"
              />
            </div>
            <div className="invoice-update-flex">
              <p>PDF</p>
              <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
              <input
                // component="input"
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={(ref) => { this.uploadInput = ref; }}
                className="invoice-update_field"
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

const mapStateToProps = state => {
  return {
    invoice: state.auth.currentInvoice,
  };
};

UpdateInvoice = connect(null, { updateInvoice })(UpdateInvoice);

export default reduxForm({
  form: 'updateInvoice', // Unique name for the form
})(UpdateInvoice);
