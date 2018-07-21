import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../sidebar';
import Invoice from './dataInvoice';
import { getAllInvoices, handleInvoiceIdx } from '../../actions/invoices';

class Invoices extends Component {
  state = {
    imageURL: '',
    search: '',
  }

  async componentDidMount() {
    await this.props.getAllInvoices();
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  // handleUploadImage(ev) {
  //   ev.preventDefault();

  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   data.append('filename', this.fileName.value);

  //   fetch('/upload', {
  //     method: 'POST',
  //     body: data,
  //   }).then((response) => {
  //     response.json().then((body) => {
  //       this.setState({ imageURL: `http://localhost:8000/${body.file}` });
  //     });
  //   });
  // }

  render() {
    const { invoices } = this.props;
    let filteredInvoices = [];
    if (invoices) {
      filteredInvoices = invoices.filter(invoice => {
        return invoice.clientName.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }
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
          {invoices.length >= 1 ? (
            <div className="invoice-box">
              {filteredInvoices.map((inv, index) => {
                return (
                  <Invoice
                    key={inv._id}
                    id={inv._id}
                    invoiceID={inv.number}
                    clientName={inv.clientName}
                    company={inv.companyName}
                    handleNoteIndex={this.props.handleInvoiceIdx}
                    history={this.props.history}
                  />
                );
              })}
            </div>
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
  };
};

export default connect(mapStateToProps, { getAllInvoices, handleInvoiceIdx })(Invoices);
