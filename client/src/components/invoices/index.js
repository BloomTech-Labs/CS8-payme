import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';
import Invoice from './dataInvoice';
import { connect } from 'react-redux';
import { getAllInvoices, handleInvoiceIdx } from '../../actions';

class Invoices extends Component {
  state = {
    imageURL: '',
  }
  async componentDidMount() {
    await this.props.getAllInvoices();
  }
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
    return (
      <div className="invoice">
        <Sidebar />
        <div className="invoice-search">
          <input
          type="text"
          placeholder="Search Invoices"
          className="invoice-search_input"
          value={this.state.search}
          onChange={this.updateSearch}
          />
        </div>
        {this.props.invoices ? (
          <div className="invoice-box">
            {this.props.invoices.map((inv, index) => {
              return (
                <Invoice
                  key={inv._id}
                  id={inv._id}
                  invoiceID={inv.number}
                  clientName={index}
                  company={inv.title}
                  handleNoteIndex={this.props.handleInvoiceIdx}
                  history={this.props.history}
                />
              );
            })}
          </div>
        ) : null }
        <div className="try">
        <Link to="/addinvoice"><p className="invoice-new">Add Invoice<i className="fas fa-plus  fa-fw" /></p></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.auth.invoices,
  };
};

export default connect(mapStateToProps, { getAllInvoices, handleInvoiceIdx })(Invoices);
