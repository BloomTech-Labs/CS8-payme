import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Sidebar from '../sidebar';
import { addInvoice } from '../../actions/invoices';

class AddInvoice extends Component {
  state = {
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const info = new FormData(event.target);
      info.append('filename', event.target.file.name);
    this.props.addInvoice(info, this.props.history);
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
          <form className="add-invoice" onSubmit={(this.handleFormSubmit)}>
            <input
              name="clientName"
              className="add-invoice_field"
              placeholder="Name"
            />
            <br />
            <input
              name="companyName"
              className="add-invoice_field"
              placeholder="Company"
            />
            <br />
            <input
              name="email"
              className="add-invoice_field"
              placeholder="Email"
            />
            <br />
            <input
              type="number"
              name="phone"
              className="add-invoice_field"
              placeholder="Phone"
            />
            <br />
            <input
              type="number"
              name="number"
              className="add-invoice_field"
              placeholder="Invoice Number"
            />
            <br />
            <input
              type="number"
              name="totalAmount"
              className="add-invoice_field"
              placeholder="Total Amount"
            />
            <br />
            <input
              type="file"
              name="file"
              className="add-invoice_field"
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
