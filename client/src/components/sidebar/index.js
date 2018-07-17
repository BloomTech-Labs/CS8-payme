import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Nico from './Nico.jpg';

class Sidebar extends Component {
  state = {}
  render() { 
    return ( 
      <div className="sidebar">
        <h1 className="sidebar--title">
          payMe <span className="sidebar--dot">.</span>
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
            <p><NavLink exact to='/billing'><i className="far fa-credit-card fa-fw" />Billings</NavLink></p>
            <p
              // style={{ cursor: 'pointer', color: 'rgb(129, 129, 129)' }}
              // onClick={e => this.logoutUser(e)}
            ><NavLink to='/'><i className="fas fa-sign-out-alt fa-fw" />Sign Out</NavLink>
            </p>
          </div>
        </div>
      </div>

     )
  }
}
 
export default Sidebar;