import React, { Component } from 'react';
import Sidebar from '../sidebar/';

class Settings extends Component {
  state = {}
  render() { 
    return ( 
      <div className="settings">
        <Sidebar />
      </div>
     )
  }
}
 
export default Settings;