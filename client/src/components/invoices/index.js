import React, { Component } from 'react';
import Sidebar from '../sidebar/';

class Invoices extends Component {
  state = {}
  render() { 
    return ( 
        <div className="invoice">
          <Sidebar />
          <div className="invoice-box">
            <p>Id of invoice</p>
            <p>Name</p>
            <p>Company Inc</p>
            <p>Email@gmail.com</p>
            <p>phone number <span> Invoice PDF</p>
            <hr />
            <p>Weekly</p>
          </div>
        </div>
     )
  }
}
 
export default Invoices;