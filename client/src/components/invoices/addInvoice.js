import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Sidebar from '../sidebar';
import { addInvoice } from '../../actions';

class AddInvoice extends Component {
  state = {}

  handleFormSubmit = (credentials) => {
    const pdf = new FormData();
    pdf.append('file', this.uploadInput.files[0]);
    pdf.append('filename', 'this.fileName.value');
  
    this.props.addInvoice({ ...credentials, pdf: pdf.file }, this.props.history);
  };


  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="invoice">
        <Sidebar />
        <Link to="invoices"><p><i className="fas fa-arrow-left fa-fw" /></p></Link>
        <div className="invoice-form">
          <h1>Add Invoice</h1>
          <form className="add-invoice" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field
              name="clientName"
              component="input"
              className="add-invoice_field"
              placeholder="Name"
            />
            <br />
            <Field
              name="companyName"
              component="input"
              className="add-invoice_field"
              placeholder="Company"
            />
            <br />
            <Field
              name="email"
              component="input"
              className="add-invoice_field"
              placeholder="Email"
            />
            <br />
            <Field
              type="number"
              name="phone"
              component="input"
              className="add-invoice_field"
              placeholder="Phone"
            />
            <br />
            <Field
              type="number"
              name="totalAmount"
              component="input"
              className="add-invoice_field"
              placeholder="Invoice Number"
            />
            <br />
            <Field
              type="number"
              name="number"
              component="input"
              className="add-invoice_field"
              placeholder="Total Amount"
            />
            <br />
            <input
              // component="input"
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              ref={(ref) => { this.uploadInput = ref; }}
              className="add-invoice_field"
              placeholder="Upload PDF"
            />
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
            <br />
            <button
              className="add-invoice_submit"
              type="submit"
              value="Submit"
            >Add Invoice
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddInvoice = connect(null, { addInvoice })(AddInvoice);

export default reduxForm({
  form: 'addInvoice', // Unique name for the form
})(AddInvoice);
