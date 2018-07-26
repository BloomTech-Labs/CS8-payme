import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';

import Sidebar from '../../sidebar';
import Invoice from './dataInvoice';
import { getAllInvoices, handleInvoiceIdx, onSortEnd } from '../../../actions/invoices';

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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderList = arrayMove(this.props.invoices, oldIndex, newIndex);
    this.props.onSortEnd(newOrderList, this.props.invoices);
  };

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  listView =() => {
    this.setState({ listView: true, boxView: false });
  }
  boxView =() => {
    this.setState({ listView: false, boxView: true });
  }

  togglePDF = () => {
    this.setState({ pdfToggle: !this.state.pdfToggle });
  }

  render() {
    const { invoices } = this.props;
    let filteredInvoices = [];
    if (invoices) {
      filteredInvoices = invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
    let className=''
    if (this.state.boxView) {
      className="invoice-box";
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
                link={`http://localhost:5000/api/getpdf/${inv._id}`}
                boxView={this.state.boxView}
                listView={this.state.listView}
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
            <p className="invoice-sort">Sort<br /> Data<i className="fas fa-sort fa-fw"></i></p>
            <hr className="navigation-line" />
            <div className="own-class ui compact menu" style={{ border: 'none' }}>
              <div className="ui simple dropdown item own-class" style={styles}>
                View
                <i className="fas fa-eye fa-fw"/>
                <div className="menu" style={{ paddingTop: '0.9rem', fontSize: '1.3rem' }}>
                  <div className="item" onClick={this.listView}>List</div>
                  <div className="item" onClick={this.boxView}>Box</div>
                </div>
              </div>
            </div>
          </div>
          <div className="invoice-success"><p>{this.props.message}</p></div>
          {this.state.listView && invoices.length > 0 ? (
            <div className="invoice-list-headerdiv">
              <ul className="invoice-list-headers">
                <li >Inovice Number</li>
                <li>Client Name</li>
                <li>Company</li>
                <li>PDF</li>
                <li>Reminder</li>
              </ul>
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

export default connect(mapStateToProps, { onSortEnd, getAllInvoices, handleInvoiceIdx })(Invoices);
