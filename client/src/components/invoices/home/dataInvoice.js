import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getPdf } from '../../../actions/invoices';
import Pdf from './pdf';


const Datainvoice = SortableElement(props => {
  return (
    <React.Fragment>
      {props.boxView ? (
        <div className="invoice-data">
          <div className="invoice-data-flex" onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>
            <p className="invoice-data-id">#{props.invoiceID}</p>
            <i className="far fa-edit"></i>
          </div>
          <p className="invoice-data-name">{props.clientName}</p>
          <p className="invoice-data-company">{props.company}</p>
          <p><span className="invoice-data-pdf" onClick={() => props.togglePdf()}> Invoice PDF<i className="fas fa-paperclip"></i></span></p>
          {props.isPdfToggled ? (
              <Pdf togglePdf={props.togglePdf} id={props.id}/>
            ) : null}
          <hr className="invoice-data-hr"/>
          <p>Weekly</p>
        </div>

      ) : 
      (
        <div className="invoice-list">
          <p className="invoice-list-id"onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}>#{props.invoiceID}</p>
          <div className="invoice-list-box" >
            <p className="invoice-list-box_name">{props.clientName}</p>
          </div>
          <p className="invoice-list-company">{props.company}</p>
          <div>
            {/* <Link to="/pdf"> */}
              <span className="invoice-data-pdf"
                onClick={() => props.togglePdf(props.invoiceID, 'showpdf')}> 
                Invoice PDF
                <i className="fas fa-paperclip"></i>
              </span>
            {/* </Link> */}
          </div>
          <p className="invoice-list-reminder">Weekly
          <i class="far fa-envelope" style={{marginLeft: '0.5rem'}}></i>
          <i class="fas fa-mobile-alt"  style={{marginLeft: '0.5rem'}}></i>
          </p>
          {props.isPdfToggled ? (
            <Pdf togglePdf={props.togglePdf} />
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
});

const mapStateToProps = state => {
  return {
    success: state.invoice.success,
  };
};

export default connect(mapStateToProps, { handleInvoiceIdx, getPdf })(Datainvoice);
