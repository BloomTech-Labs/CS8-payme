import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
// import logo from './google.png';

class Signup extends Component {
  
  componentDidMount() {
    if (localStorage.getItem('id')) this.props.history.push('/invoices');
  }
  handleFormSubmit = (credentials) => {
    this.props.register(credentials, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;

    return ( 
      <div className="signup">
        <p className="signup-headline">Lorem ipsum <br/> <span className="signup-headline2">dolor sit amet</span></p>
        <div className="signup--box">
        <h1 className="signin-notey">payME</h1>
          <h1 className="signin--header">Sign Up With</h1>
          <h3>{this.props.error}</h3>
          <form className="signin--signin" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field
              type="email"
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
            <Field
              name="firstName"
              component="input"
              className="signin--signin__password"
              placeholder="firstName"
            />
            <br />
            <Field
              name="lastName"
              component="input"
              className="signin--signin__password"
              placeholder="lastName"
            />
            <br />
            <Field
              name="phone"
              component="input"
              type="number"
              className="signin--signin__password"
              placeholder="phone"
            />
            <br />
            <button
              className="signin--signin__button"
              action="submit"
            >Sign Up </button>
          </form>
          <p className="signin--orsign"> Or sign up with </p>
          {/* <div className="signin--buttons">
            <button className="signin--buttons__facebook">
              <i className="fab fa-facebook-square" />facebook
            </button>
            <button className="signin--buttons__google">
              <img
                src={logo}
                alt="google logo"
                className="signin--buttons__google--logo"
              />Google
            </button>
          </div> */}
          <p className="signin--notmember">
            {' '}
            Already a member? <Link to="/signin"> Sign in </Link>
          </p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    message: state.error,
  };
};

Signup = (connect(mapStateToProps, { register })(Signup));

export default reduxForm({
  form: 'register', // Unique name for the form
  fields: ['username', 'password', 'firstName', 'lastName', 'phone'],
})(Signup);
