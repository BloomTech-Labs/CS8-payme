import React, { Component } from 'react';
import Sidebar from '../sidebar/';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class AddInvoice extends Component {
  state = {}
  handleFormSubmit = ({ username, password }) => {
    this.props.login(username, password, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;  
    return ( 
      <div>
        <Sidebar />
        <h1>HII</h1>
        <form className="add-invoice" onSubmit={this.handleFormSubmit}>
            <Field
              name="username"
              component="input"
              className="add-invoice_username"
              placeholder="Username"
            />
            <br />
            <Field
              name="password"
              component="input"
              className="add-invoice_password"
              placeholder="Password"
            />
            <br />
            <button
              className="add-invoice_button"
              action="submit"
              value="Sign In"
            >Sign In</button>
          </form>
      </div>
     )
  }
}
 
AddInvoice = connect(null, )(AddInvoice);

export default reduxForm({
  form: 'logginIn', // Unique name for the form
  fields: ['username', 'password'],
})(AddInvoice);