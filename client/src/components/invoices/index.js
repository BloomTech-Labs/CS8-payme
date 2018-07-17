import React, { Component } from 'react';
import Sidebar from '../sidebar/';

class Invoices extends Component {
  state = {}
  render() { 
    return ( 
        <div className="invoices">
          <Sidebar />
        </div>
     )
  }
}
 
export default Invoices;