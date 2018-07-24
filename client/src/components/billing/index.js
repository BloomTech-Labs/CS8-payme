import React, { Component } from 'react';
import Sidebar from '../sidebar/';
import Adminbilling from './AdminBilling';

class Billing extends Component {
  state = {}
  render() { 
    return ( 
      <div className="billing">
        <Sidebar />
        <div className="billing-container">
          <Adminbilling />
        </div>
      </div>
     )
  }
}
 
export default Billing;
