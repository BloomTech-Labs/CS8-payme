import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleInvoiceIdx, getAllInvoices, getInvoice } from '../../../actions/invoices';

import Sidebar from '../../sidebar';
import DeleteInvoice from './deleteInvoice';
import UpdateInvoice from './updateInvoice';
import ViewExport from './viewexport';

class ViewInvoice extends Component {
  state = {
    modalTrigger: false,
    updateField: false,
  };

  showUpdate = () => {
    this.setState({ updateField: !this.state.updateField });
  };

  toggleModal = _ => {
    this.setState({ modalTrigger: !this.state.modalTrigger });
  };

  render() {
    const { invoice } = this.props;
    const params = this.props.match.params.id;
    if (!invoice) {
      this.props.getInvoice(params);
    }
    return (
      <div className="window">
        <Sidebar />
        <div className="billing-container">
          <div className="billing-navigation" style={{ justifyContent: 'flex-start' }}>
            <div className="billing-navigation_container">
              <div
                className="billing-navigation_container_clickable"
                style={{ alignSelf: 'center' }}
                onClick={() => this.props.history.push('/invoices')}
              >
                {/* <Link to="/invoices"> */}
                <i className="fas fa-arrow-left fa-fw" />
                {/* </Link> */}
              </div>
            </div>
            <div className="billing-navigation_container">
              <div
                className="billing-navigation_container_clickable"
                onClick={() => this.toggleModal()}
              >
                <p className="billing-navigation_data_title">Delete Invoice</p>
                <i className="far fa-trash-alt fa-fw" />
              </div>
            </div>
            <hr className="navigation-line" />
            <div className="billing-navigation_container">
              <div
                className="billing-navigation_container_clickable"
                onClick={() => this.showUpdate()}
              >
                <p className="billing-navigation_data_title">Update Invoice</p>
                <i className="fas fa-pen-square fa-fw" />
              </div>
            </div>
          </div>
          {invoice ? (
            <div>
              {!this.state.updateField ? (
                <ViewExport
                  invoice={invoice}
                  url={`http://localhost:5000/api/getpdf/${invoice._id}`}
                />
              ) : (
                <UpdateInvoice />
              )}
              {this.state.modalTrigger ? (
                <div>
                  <DeleteInvoice
                    toggleModal={this.toggleModal}
                    handleDeleteNote={this.props.handleDeleteNote}
                    id={invoice.number}
                    history={this.props.history}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="loader">Loading..</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoice: state.invoice.currentInvoice,
  };
};

export default connect(
  mapStateToProps,
  { handleInvoiceIdx, getInvoice, getAllInvoices },
)(ViewInvoice);
