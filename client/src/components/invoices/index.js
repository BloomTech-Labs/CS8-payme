import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../sidebar/';

class Invoices extends Component {
  state = {}
  render() { 
    return ( 
        <div className="invoice">
          <Sidebar />
          <div className="invoice-box">
            <p className="invoice-id">#23242342</p>
            <p>Name</p>
            <p>Company Inc</p>
            <p>Email@gmail.com</p>
            <p>phone number <span className="invoice-pdf"> Invoice PDF</span></p>
            <hr />
            <p>Weekly</p>
          </div>
          <NavLink to="/addinvoice"><p className="invoice-add">Add Invoice</p></NavLink>
        </div>
     )
  }
}
 
export default Invoices;