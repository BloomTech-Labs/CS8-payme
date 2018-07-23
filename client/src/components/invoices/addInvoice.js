import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Sidebar from '../sidebar';
import { addInvoice } from '../../actions/invoices';

class AddInvoice extends Component {
  state = {
    selectedFile: null,
  }

  handleFormSubmit = (credentials) => {
    let pdf = new FormData();
    if (this.state.selectedFile) {
      pdf.append('image', this.state.selectedFile, this.state.selectedFile.name);
    }
    // console.log(pdf.get('image'));
    // const config = {
    //   headers: { 'content-type': 'multipart/form-data' },
    // };
    console.log(credentials);
    this.props.addInvoice({ ...credentials, pdf }, this.props.history);
  };

  fileHandler = event => {
    const data = event.target.files[0];
    this.setState({ selectedFile: data });
  }


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
              name="number"
              component="input"
              className="add-invoice_field"
              placeholder="Invoice Number"
            />
            <br />
            <Field
              type="number"
              name="totalAmount"
              component="input"
              className="add-invoice_field"
              placeholder="Total Amount"
            />
            <br />
            <input
              type="file"
              className="add-invoice_field"
              onChange={this.fileHandler}
            />
            <button
              className="add-invoice_submit"
              type="submit"
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
