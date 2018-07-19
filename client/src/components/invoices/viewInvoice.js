import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInvoiceIdx } from '../../actions';

import Sidebar from '../sidebar';
import DeleteInvoice from './deleteInvoice';

class ViewInvoice extends Component {
  state = { 
    modalTrigger: false,
  }

  toggleModal = _ => {
    this.setState({ modalTrigger: !this.state.modalTrigger });
  };

  render() { 
    // console.log(this.props.invoice.companyName);
    const { invoice } = this.props;
    return ( 
      <div className="view-invoice">
        <Sidebar />
        {this.state.modalTrigger ? (
            <div>
              <DeleteInvoice
                toggleModal={this.toggleModal}
                handleDeleteNote={this.props.handleDeleteNote}
              />
            </div>
        ) : null}
        <p>Update</p>
        <p onClick={() => this.toggleModal()}>Delete</p>
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
