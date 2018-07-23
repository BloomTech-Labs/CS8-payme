import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getInvoice } from '../../actions/invoices';

const Datainvoice = SortableElement(props => {
  return (
    // <div className="invoice-data">
    //   <div className="invoice-data-flex" onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>
    //     <p className="invoice-data-id">#{props.invoiceID}</p>
    //     <i className="far fa-edit"></i>
    //   </div>
    //   <p className="invoice-data-name">{props.clientName}</p>
    //   <p className="invoice-data-company">{props.company}</p>
    //   <Link to='/pdf'><p><span className="invoice-data-pdf"> Invoice PDF</span></p></Link>
    //   <hr className="invoice-data-hr"/>
    //   <p>Weekly</p>
    // </div>
    <div className="invoice-list" onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>
      <p className="invoice-list-id">#{props.invoiceID}</p>
      {/* <i className="far fa-edit"></i> */}
    <div className="invoice-list-box">
      <p className="invoice-list-box_name">{props.clientName}</p>
    </div>
    <p className="invoice-list-company">{props.company}</p>
    <Link to='/pdf'><p><span className="invoice-data-pdf"> Invoice PDF</span></p></Link>
    {/* <hr className="invoice-list-hr"/> */}
    <p className="invoice-list-reminder">Weekly</p>
  </div>
  );
});

const mapStateToProps = state => {
  return {
    success: state.invoice.success,
  };
};

export default connect(mapStateToProps, { handleInvoiceIdx, getInvoice })(Datainvoice);
