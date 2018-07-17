import React, { Component } from 'react';
import Sidebar from '../sidebar/';

class Reminders extends Component {
  state = {}
  render() { 
    return ( 
      <div className="reminder">
        <Sidebar />
      </div>
     )
  }
}
 
export default Reminders;