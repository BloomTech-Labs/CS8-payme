import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

import Sidebar from '../../sidebar';
import Invoice from './dataInvoice';
import {
  getAllInvoices,
  handleInvoiceIdx,
  onSortEnd,
  getInvoice,
  resetCurrInv,
  sortData,
  sortByClientName,
} from '../../../actions/invoices';

import { allReminders } from '../../../actions/smsReminders';

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
    isDesktop: false,
  };

  componentDidMount() {
    this.props.getAllInvoices();
    this.props.allReminders();
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePredicate);
  }

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth < 600 });
  };

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
  listView = () => {
    this.setState({ listView: true, boxView: false });
  };

  boxView = () => {
    this.setState({ listView: false, boxView: true });
  };

  // PDF
  // togglePDF = (id, show) => {
  //   // console.log(show);
  //   if (show === 'showpdf') {
  //     return this.props.getInvoice(id), this.setState({ pdfToggle: true });
  //   }
  // };

  addInvoiceCheck = () => {
    const payment = new Date().getTime() - this.props.admin.subscription;
    if (payment < 0 || this.props.admin.invoiceCredits > 0) {
      this.props.history.push('/addinvoice');
    } else {
      alert('Please purchase a subscription or invoice credit.');
      this.props.history.push('/billing');
    }
  };

  render() {
    const { isDesktop } = this.state;
    // Serach Invoices
    const { invoices } = this.props;
    const { reminders } = this.props;
    // console.log(reminders);
    let filteredInvoices = [];
    if (invoices) {
      filteredInvoices = invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
    // Box view || list view ?
    let className = '';
    if (this.state.boxView || isDesktop) {
      className = 'invoice-box';
    }
    const SortableList = SortableContainer(props => {
      return (
        <div className={className}>
          {filteredInvoices.map((inv, index) => {
            // console.log('inv');
            // console.log(inv);
            return (
              <Invoice
                key={inv._id}
                id={inv._id}
                img={inv.img}
                index={index}
                invoiceID={inv.number}
                clientName={inv.clientName}
                company={inv.companyName}
                history={this.props.history}
                // isPdfToggled={this.state.pdfToggle}
                togglePdf={this.togglePDF}
                boxView={this.state.boxView}
                listView={this.state.listView}
                isDesktop={isDesktop}
                reminders={reminders}
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
              // className="fas fa-search"
              // className="invoice-search"
              type="text"
              placeholder="Search Invoices"
              className="invoice-search_input"
              value={this.state.search}
              onChange={this.updateSearch}
            />
            <hr className="navigation-line" />
            <div onClick={this.addInvoiceCheck}>
              <p className="invoice-new">
                Add Invoice<i className="fas fa-plus  fa-fw" />
              </p>
            </div>
            <hr className="navigation-line" />
            <div className="own-class ui compact menu" style={{ border: 'none' }}>
              <div className="ui simple dropdown item own-class" style={styles}>
                Sort
                <i className="fas fa-sort fa-fw" />
                <div className="menu" style={{ paddingTop: '0.9rem', fontSize: '1.3rem' }}>
                  <div className="item" onClick={this.props.sortData}>
                    Total Amount
                  </div>
                  <div className="item" onClick={this.props.sortByClientName}>
                    ClientName
                  </div>
                </div>
              </div>
            </div>
            <hr className="navigation-line" />
            <div className="own-class ui compact menu" style={{ border: 'none' }}>
              <div className="ui simple dropdown item own-class" style={styles}>
                View
                <i className="fas fa-eye fa-fw" />
                <div className="menu" style={{ paddingTop: '0.9rem', fontSize: '1.3rem' }}>
                  <div className="item" onClick={this.listView}>
                    List
                  </div>
                  <div className="item" onClick={this.boxView}>
                    Box
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-success">
            <p>{this.props.message}</p>
          </div>
          {!isDesktop && (this.state.listView && invoices.length > 0) ? (
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
          ) : null}
          {invoices.length > 0 ? (
            <SortableList
              pressDelay={150}
              lockToContainerEdges
              axis="xy"
              invoices={invoices}
              onSortEnd={this.onSortEnd}
            />
          ) : (
            <p className="invoice-letstart">
              Looks like you dont have any Invoices! Click <Link to="/addinvoice">here</Link> to get
              started
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    message: state.invoice.success,
    admin: state.auth.admin,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  {
    onSortEnd,
    getAllInvoices,
    handleInvoiceIdx,
    getInvoice,
    resetCurrInv,
    sortData,
    sortByClientName,
    allReminders,
  },
)(Invoices);
