import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInvoiceIdx, getInvoice } from '../../actions/invoices';

const Datainvoice = (props) => {
  return ( 
    <div className="invoice-data">
      <div className="invoice-data-flex" onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>
        <p className="invoice-data-id">#{props.invoiceID}</p>
        <i className="far fa-edit"></i>
      </div>
      <p className="invoice-data-name">{props.clientName}</p>
      <p className="invoice-data-company">{props.company}</p>
      <Link to='/pdf'><p><span className="invoice-data-pdf"> Invoice PDF</span></p></Link>
      <hr className="invoice-data-hr"/>
      <p>Weekly</p>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    success: state.invoice.success,
  };
};

export default connect(mapStateToProps, { handleInvoiceIdx, getInvoice })(Datainvoice);
