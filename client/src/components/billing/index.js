import React, { Component } from 'react';
import Sidebar from '../sidebar/';

class Billing extends Component {
  state = {}
  render() { 
    return ( 
      <div className="billing">
        <Sidebar />
      </div>
     )
  }
}
 
export default Billing;