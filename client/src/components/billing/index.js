import React, { Component } from 'react';
import Sidebar from '../sidebar';
import AdminBilling from './AdminBilling';

class Billing extends Component {
  state = {};

  render() {
    return (
      <div className="billing">
        <Sidebar />
        <AdminBilling />
      </div>
    );
  }
}

export default Billing;
