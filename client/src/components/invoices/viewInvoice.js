import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInvoiceIdx } from '../../actions';
import Sidebar from '../sidebar';

class ViewInvoice extends Component {
  state = { }

  render() { 
    // console.log(this.props.invoice.companyName);
    const { invoice } = this.props;
    return ( 
      <div className="view-invoice">
        <Sidebar />
        <p>Update</p>
        <div className="view-invoice-details">
          <p>{invoice.number}</p>
          <p>{invoice.clientName}</p>
          <p>{invoice.companyName}</p>
          <p>{invoice.totalAmount}</p>
        </div>
      </div>
     );
  }
}

const mapStateToProps = state => {
  return {
    invoice: state.auth.currentInvoice,
  };
};

export default connect(mapStateToProps, { handleInvoiceIdx })(ViewInvoice);
