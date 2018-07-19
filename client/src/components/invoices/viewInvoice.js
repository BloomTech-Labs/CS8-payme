import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleInvoiceIdx, getAllInvoices } from '../../actions';

import Sidebar from '../sidebar';
import DeleteInvoice from './deleteInvoice';

class ViewInvoice extends Component {
  state = {
    modalTrigger: false,
  }

  async componentWillMount() {
    await this.props.getAllInvoices();
  }

  toggleModal = _ => {
    this.setState({ modalTrigger: !this.state.modalTrigger });
  };

  render() {
    const { invoice } = this.props;
    console.log(invoice.number);
    return (
      <div className="view-invoice">
        <Sidebar />
        <div className="view-invoice-main">
          <div className="view-invoice-navigation">
              <p className="view-invoice-navigation_delete" onClick={() => this.toggleModal()}>Delete <i class="far fa-trash-alt fa-fw"></i><br />Invoice</p>
              <hr className="navigation-line"/>
              <p className="view-invoice-navigation_update">Update <i class="fas fa-pen-square fa-fw"></i><br /> Invoice</p>
          </div>
          <Link to="/invoices"><p><i className="fas fa-arrow-left fa-fw" /></p></Link>
          <div>  
            <div className="view-invoice-box">
              <div className="view-invoice-details">
                <p>{invoice.number}</p>
                <p>{invoice.clientName}</p>
                <p>{invoice.companyName}</p>
                <p>{invoice.totalAmount}</p>
              </div>
              {this.state.modalTrigger ? (
                <div>
                  <DeleteInvoice
                    toggleModal={this.toggleModal}
                    handleDeleteNote={this.props.handleDeleteNote}
                  />
                </div>
              ) : null}
            </div>
          </div>
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

export default connect(mapStateToProps, { handleInvoiceIdx, getAllInvoices })(ViewInvoice);
