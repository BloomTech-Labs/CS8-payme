import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

import Sidebar from '../../sidebar';
import Invoice from './dataInvoice';
import {
 getAllInvoices, handleInvoiceIdx, onSortEnd, getInvoice, resetCurrInv 
} from '../../../actions/invoices';

//NOTE- Tried exporting these style to classes
// but it wasn't functioning correctly. Look into-
const styles = {
  backgroundColor: 'rgb(45, 45, 45)',
  color: 'white',
  border: 'none',
  fontSize: '1.5rem',
  paddingBottom: '2rem',
  paddingTop: '1.5rem',
};

class Invoices extends Component {
  state = {
    search: '',
    listView: true,
    boxView: false,
    pdfToggle: false,
  }

  componentDidMount() {
    this.props.getAllInvoices();
  }

  // React sortable elements
  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderList = arrayMove(this.props.invoices, oldIndex, newIndex);
    this.props.onSortEnd(newOrderList, this.props.invoices);
  };

  // Search
  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  //views
  listView =() => {
    this.setState({ listView: true, boxView: false });
  }

  boxView =() => {
    this.setState({ listView: false, boxView: true });
  }

  // PDF handler
  togglePDF = (id, show) => {
    console.log(show);
    if (show === 'showpdf') {
      return this.props.getInvoice(id),
      this.setState({ pdfToggle: true });
    }
    this.setState({ pdfToggle: false });
    this.props.resetCurrInv();
  }

  render() {
    // Serach Invoices
    const { invoices } = this.props;
    let filteredInvoices = [];
    if (invoices) {
      filteredInvoices = invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
    // Box view || list view ?
    let className = '';
    if (this.state.boxView) {
      className = 'invoice-box';
    }
    const SortableList = SortableContainer(props => {
      return (
        <div className={className}>
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
                isPdfToggled={this.state.pdfToggle}
                togglePdf={this.togglePDF}
                boxView={this.state.boxView}
                listView={this.state.listView}
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
            <input className="fas fa-search"
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
            <p className="invoice-sort">Sort<br /> Data<i className="fas fa-sort fa-fw" /></p>
            <hr className="navigation-line" />
            <div className="own-class ui compact menu" style={{ border: 'none' }}>
              <div className="ui simple dropdown item own-class" style={styles}>
                View
                <i className="fas fa-eye fa-fw" />
                <div className="menu" style={{ paddingTop: '0.9rem', fontSize: '1.3rem' }}>
                  <div className="item" onClick={this.listView}>List</div>
                  <div className="item" onClick={this.boxView}>Box</div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-success"><p>{this.props.message}</p></div>
          {this.state.listView && invoices.length > 0 ? (
            <div className="invoice-list">
              <div className="invoice-list-box">
                <p>Inovice Number</p>
              </div>
              <div className="invoice-list-box">
                <p>ClientName</p>
              </div>
              <div className="invoice-list-box">
                <p>CompanyName</p>
              </div>
              <div className="invoice-list-box">
                <p>PDF</p>
              </div>
              <div className="invoice-list-box">
                <p>Reminder</p>
              </div>
            </div>
          ) : null }
          {invoices.length > 0 ? (
            <SortableList
              pressDelay={150}
              lockToContainerEdges
              axis="xy"
              invoices={invoices}
              onSortEnd={this.onSortEnd}
            />
          ) : <p className="invoice-letstart">Looks like you dont have any Invoices! Click <Link to='/addinvoice'>here</Link> to get started</p>}
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

export default connect(mapStateToProps, {
 onSortEnd, getAllInvoices, handleInvoiceIdx, getInvoice, resetCurrInv,
})(Invoices);
