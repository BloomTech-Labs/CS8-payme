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
        {/* <form className="signin--signin" onSubmit={this.handleFormSubmit}>
            <Field
              name="username"
              component="input"
              className="signin--signin__username"
              placeholder="Username"
            />
            <br />
            <Field
              name="password"
              component="input"
              className="signin--signin__password"
              placeholder="Password"
            />
            <br />
            <button
              className="signin--signin__button"
              action="submit"
              value="Sign In"
            >Sign In</button>
          </form> */}
      </div>
     )
  }
}
 
AddInvoice = connect(null, )(AddInvoice);

export default reduxForm({
  form: 'logginIn', // Unique name for the form
  fields: ['username', 'password'],
})(AddInvoice);