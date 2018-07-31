import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Nico from './Nico.jpg';


class Sidebar extends Component {
  logoutUser = () => {
    this.props.logout(this.props.history);
  };

  toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('active');
  }

  render() {
    return (
    <div>
      <div style={{display: 'flex'}}>
        <div className="slideout" onClick={() => this.toggleSidebar()}> 
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
        <h1 className="slideout--title">
          payMe
          <span className="slideout--dot">
          .
          </span>
          <br />
        </h1>
        </div>
      </div>
        <div id="sidebar">
          {/* <div className="sidebar--chat">
            <div className="sidebar--users">
              <p>Welcome</p>
              <div className="sidebar-profile">
                <img src={Nico} alt="profile" className="sidebar-profile_pic" />
              </div>
              <p>{this.props.admin.username}</p>
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
          </div> */}
          <div className="sidebar--minimal">
            <div className="sidebar-min-links">
              <p><NavLink to='/invoices'><i className="fas fa-envelope-open fa-fw" /></NavLink></p>
              <p><NavLink exact to='/reminders'><i className="fas fa-bell fa-fw" /></NavLink></p>
              <p><NavLink exact to="/settings"><i className="fas fa-cog fa-fw" /></NavLink></p>
              <p><NavLink exact to='/billing'><i className="far fa-credit-card fa-fw" /></NavLink></p>
              <p
                onClick={() => this.logoutUser()}
              ><Link to=''><i className="fas fa-sign-out-alt fa-fw" /></Link>
              </p>
            </div>
          </div>
        </div>
    </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
  };
};

export default withRouter(connect(mapStateToProps, { logout })(Sidebar));
