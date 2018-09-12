import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SideNav from '../sidebar';

class RemindersHome extends Component {
  render() {
    return (
      <div className="reminder">
        <SideNav />
        <div className="home">
          <div className="reminder-navigation">Reminders home</div>
          <Link to="/createreminders">
            <div>====></div>
          </Link>
        </div>
      </div>
    );
  }
}

export default RemindersHome;
