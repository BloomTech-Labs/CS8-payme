import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getPdf } from '../../../actions/invoices';
import { getReminder } from '../../../actions/smsReminders';
// import Pdf from './pdf';

const Datainvoice = SortableElement(props => {
  return (
    <React.Fragment>
      {props.boxView ? (
        <div className="invoice-data">
          <div
            className="invoice-data-flex"
            onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}
          >
            <p className="invoice-data-id">#{props.invoiceID}</p>
            <i className="far fa-edit" />
          </div>
          <p className="invoice-data-name">{props.clientName}</p>
          <p className="invoice-data-company">{props.company}</p>
          <p>
            <span className="invoice-data-pdf" onClick={() => props.togglePdf()}>
              {' '}
              Invoice PDF<i className="fas fa-paperclip" />
            </span>
          </p>
          {props.isPdfToggled ? props.history.push('/pdf') : null}
          <hr className="invoice-data-hr" />
          <p>Weekly</p>
        </div>
      ) : (
        <div className="invoice-list">
          <p
            className="invoice-list-id"
            onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}
          >
            #{props.invoiceID}
          </p>
          <div className="invoice-list-box">
            <p className="invoice-list-box_name">{props.clientName}</p>
          </div>
          <p className="invoice-list-company">{props.company}</p>
          <div>
            {/* <Link to="/pdf"> */}
            <span
              className="invoice-data-pdf"
              onClick={() => props.togglePdf(props.invoiceID, 'showpdf')}
            >
              Invoice PDF
              <i className="fas fa-paperclip" />
            </span>
            {/* </Link> */}
          </div>
          {/* reminders */}
          <p className="invoice-list-reminder">
            {props.reminders.option}
            <i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />
            <i className="fas fa-mobile-alt" style={{ marginLeft: '0.5rem' }} />
          </p>
          <div>{props.isPdfToggled ? props.history.push('/pdf') : null}</div>
        </div>
      )}
    </React.Fragment>
  );
});

const mapStateToProps = state => {
  return {
    success: state.invoice.success,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  { handleInvoiceIdx, getPdf, getReminder },
)(Datainvoice);
