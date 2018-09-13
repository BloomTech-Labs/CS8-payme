import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getPdf } from '../../../actions/invoices';
import { getReminder, deleteSms } from '../../../actions/smsReminders';
// import Pdf from './pdf';

import Reicons from '../../reminders/dataReminder';

const Datainvoice = SortableElement(props => {
  // console.log(props);
  return props.boxView || props.isDesktop ? (
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
        {props.img.data ? (
          <a className="invoice-data-pdf" href={`viewpdf/${props.id}`} target="_blank">
            Invoice PDF
            <i className="fas fa-paperclip" />
          </a>
        ) : (
          <span className="invoice-data-pdf" onClick={() => alert('No invoice loaded.')}>
            {' '}
            Invoice PDF
            <i className="fas fa-paperclip" />
          </span>
        )}
      </p>
      {/* {props.isPdfToggled ? props.history.push('/pdf') : null} */}
      <hr className="invoice-data-hr" />
      <span>
        {props.reminder.map((rem, i) => {
          return <Reicons key={i} invReminders={rem} invId={props.id} />;
        })}
      </span>
    </div>
  ) : (
    <div className="invoice-list">
      <div className="invoice-list-box">
        <p
          className="invoice-list-id"
          onClick={() => props.handleInvoiceIdx(props.invoiceID, props.history)}
        >
          #{props.invoiceID}
        </p>
      </div>
      <div className="invoice-list-box">
        <p className="invoice-list-box_name">{props.clientName}</p>
      </div>
      <div className="invoice-list-box">
        <p className="invoice-list-company">{props.company}</p>
      </div>

      <div className="invoice-list-box">
        {props.isPdfToggled ? props.history.push('/pdf') : null}
        {props.img.data ? (
          <a
            className="invoice-list-pdf"
            style={{ color: 'blue' }}
            href={`viewpdf/${props.id}`}
            target="_blank"
          >
            Invoice PDF
            <i className="fas fa-paperclip" />
          </a>
        ) : (
          <span onClick={() => alert('No invoice loaded.')}> No Invoice</span>
        )}
      </div>
      <span>
        {props.reminder.map((rem, i) => {
          return <Reicons key={i} invReminders={rem} invId={props.id} />;
        })}
      </span>
    </div>
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
  {
    handleInvoiceIdx,
    getPdf,
    getReminder,
    deleteSms,
  },
)(Datainvoice);
