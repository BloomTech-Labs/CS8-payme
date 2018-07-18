import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Sidebar from '../sidebar';

class AddInvoice extends Component {
  state = {}

  handleFormSubmit = ({ name, company, email, phone, invoiceNumber, uploadPdf }) => {
    // const data = new FormData();
    // data.append('file', this.uploadInput.files[0]);
    // data.append('filename', 'this.fileName.value');
    // console.log(data);
    
    // this.props.login(name, company, email, phone, invoiceNumber, this.props.history);
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
              name="name"
              component="input"
              className="add-invoice_field"
              placeholder="Name"
            />
            <br />
            <Field
              name="company"
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
              name="phone"
              component="input"
              className="add-invoice_field"
              placeholder="Phone"
            />
            <br />
            <Field
              name="invoiceNumber"
              component="input"
              className="add-invoice_field"
              placeholder="Invoice Number"
            />
            <br />
            <input
              // component="input"
              type="file"
              accept='.jpg, .png, .jpeg'
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

AddInvoice = connect(null)(AddInvoice);

export default reduxForm({
  form: 'addInvoice', // Unique name for the form
  fields: ['name', 'company', 'email', 'phone', 'invoiceNumber', 'uploadPdf'],
})(AddInvoice);
