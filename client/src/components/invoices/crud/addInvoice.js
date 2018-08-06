import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Sidebar from '../../sidebar';
import { addInvoice } from '../../../actions/invoices';

class AddInvoice extends Component {
  handleFormSubmit = event => {
    event.preventDefault();
    const info = new FormData(event.target);
    info.append('filename', event.target.file.name);
    this.props.addInvoice(info, this.props.history);
  };

  render() {
    return (
      <div className="window">
        <Sidebar />
        <div className="billing-container">
          <div
            className="billing-navigation"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
          >
            <Link to="invoices">
              <p>
                <i className="fas fa-arrow-left" />
              </p>
            </Link>
          </div>
          <div className="billing-window">
            <div className="settings-form">
              <h1>Add Invoice</h1>
              <form className="add-invoice" onSubmit={this.handleFormSubmit}>
                <input name="clientName" className="settings_field" placeholder="Name" />
                <br />
                <input name="companyName" className="settings_field" placeholder="Company" />
                <br />
                <input name="email" className="settings_field" placeholder="Email" />
                <br />
                <input type="number" name="phone" className="settings_field" placeholder="Phone" />
                <br />
                <input
                  type="number"
                  name="number"
                  className="settings_field"
                  placeholder="Invoice Number"
                />
                <br />
                <input
                  type="number"
                  name="totalAmount"
                  className="settings_field"
                  placeholder="Total Amount"
                />
                <br />
                <input type="file" name="file" className="settings_field" />
                <button className="add-invoice_submit" type="submit">
                  Add Invoice
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addInvoice },
)(AddInvoice);
