import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

import Sidebar from '../sidebar';
import Invoice from './dataInvoice';
import { getAllInvoices, handleInvoiceIdx, onSortEnd } from '../../actions/invoices';

class Invoices extends Component {
  state = {
    search: '',
  }
  
  componentDidMount() {
    this.props.getAllInvoices();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderList = arrayMove(this.props.invoices, oldIndex, newIndex);
    this.props.onSortEnd(newOrderList, this.props.invoices);
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { invoices } = this.props;
    let filteredInvoices = [];
    if (invoices) {
      filteredInvoices = invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }

    const SortableList = SortableContainer(props => {
      return (
        <div className="invoice-box">
          {filteredInvoices.map((inv, index) => {
            return (
              <Invoice
                key={inv._id}
                id={inv._id}
                index={index}
                invoiceID={inv.number}
                clientName={inv.clientName}
                company={inv.companyName}
                history={this.props.history}
              />
            );
          })}
        </div>
      );
    });
    return (
      <div className="invoice">
        <Sidebar />
        <div className="invoice-main">
          <div className="invoice-navigation">
            <input 
              // className="invoice-search"
              type="text"
              placeholder="Search Invoices"
              className="invoice-search_input"
              value={this.state.search}
              onChange={this.updateSearch}
            />
            <hr className="navigation-line" />
            <Link to="/addinvoice"><p className="invoice-new">Add Invoice<i className="fas fa-plus  fa-fw" /></p></Link>
            <hr className="navigation-line" />
            <p className="invoice-sort">Sort<br /> Data<i class="fas fa-sort fa-fw"></i></p>
          </div>
          <div className="invoice-success"><p>{this.props.message}</p></div>
          <div className="invoice-list-headerdiv">
            <ul className="invoice-list-headers">
              <li style={{width:'10rem'}}>Inovice Number</li>
              <li>Client Name</li>
              <li>Company</li>
              <li>PDF</li>
              <li >Reminder</li>
            </ul>
          </div>
          {invoices.length >= 1 ? (
            <SortableList
              pressDelay={150}
              lockToContainerEdges
              axis="xy"
              invoices={invoices}
              onSortEnd={this.onSortEnd}
            />
          ) : null}
        {/* <p className="invoice-letstart">Looks like you dont have any Invoices! Click here to get started</p> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    message: state.invoice.success,
  };
};

export default connect(mapStateToProps, { onSortEnd, getAllInvoices, handleInvoiceIdx })(Invoices);
