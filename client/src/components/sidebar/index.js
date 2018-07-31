import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { toggleSidebar } from '../../actions/invoices';
import Nico from './Nico.jpg';

const styles = {
  marginLeft: '4px',
  marginBottom: '2px',
}

class Sidebar extends Component {
  state= {
    sidebarToggled: true,
  }
  logoutUser = () => {
    this.props.logout(this.props.history);
  };

  toggleSidebar = () => {
    // document.getElementById('sidebar').classList.toggle('active');
    this.setState({ sidebarToggled: !this.state.sidebarToggled })
  }

  render() {
    return (
    <div>
      <div style={{display: 'flex'}}>
        <div className="slideout" onClick={() => this.props.toggleSidebar()}> 
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

        {this.props.sidebarToggled ? (

        <div id="sidebar">
          <div className="sidebar--chat">
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
          </div>
        </div>
         ) : 
          <div className="sidebar--minimal">
            <div className="sidebar-min-links">
              <p><NavLink className="sidebar-min-icons" to='/invoices'><i style={styles} className="fas fa-envelope-open fa-fw" /></NavLink></p>
              <p><NavLink className="sidebar-min-icons" exact to='/reminders'><i style={styles} className="fas fa-bell fa-fw" /></NavLink></p>
              <p><NavLink className="sidebar-min-icons" exact to="/settings"><i style={styles} className="fas fa-cog fa-fw" /></NavLink></p>
              <p><NavLink className="sidebar-min-icons" exact to='/billing'><i style={styles} className="far fa-credit-card fa-fw" /></NavLink></p>
              <p
                onClick={() => this.logoutUser()}
              ><Link className="sidebar-min-icons" to=''><i className="fas fa-sign-out-alt fa-fw" /></Link>
              </p>
            </div>
          </div>
        }
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
    sidebarToggled: state.invoice.toggleSidebar,
  };
};

export default withRouter(connect(mapStateToProps, { logout, toggleSidebar })(Sidebar));
