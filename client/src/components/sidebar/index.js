import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import Nico from './Nico.jpg';


class Sidebar extends Component {
  state = {}

  logoutUser = () => {
    this.props.logout(this.props.history);
  };

  render() {
    return (
      <div className="sidebar">
        <h1 className="sidebar--title">
          payMe
          <span className="sidebar--dot">
          .
          </span>
          <br />
        </h1>
        <div className="sidebar--chat">
          <div className="sidebar--users">
            <p>Welcome</p>
            <div className="sidebar-profile">
              <img src={Nico} alt="profile" className="sidebar-pic" />
            </div>
            <p>'USERNAME'</p>
          </div>
          <div className="sidebar-links">
            <p><NavLink to='/invoices'><i className="fas fa-envelope-open fa-fw" />Invoices</NavLink></p>
            <p><NavLink exact to='/reminders'><i className="fas fa-bell fa-fw" />Reminders</NavLink></p>
            <p><NavLink exact to="/settings"><i className="fas fa-cog fa-fw" />Settings</NavLink></p>
            <p><NavLink exact to='/billing'><i className="far fa-credit-card fa-fw" />Billing</NavLink></p>
            <p
              // style={{ cursor: 'pointer', color: 'rgb(129, 129, 129)' }}
              onClick={() => this.logoutUser()}
            ><Link to=''><i className="fas fa-sign-out-alt fa-fw" />Sign Out</Link>
            </p>
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};

export default withRouter(connect(mapStateToProps, { logout })(Sidebar));
