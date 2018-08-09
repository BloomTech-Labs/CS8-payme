import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { handleInvoiceIdx, getPdf } from '../../../actions/invoices';
import { getReminder, deleteSms } from '../../../actions/smsReminders';
// import Pdf from './pdf';

const Datainvoice = SortableElement(props => {
  // console.log(props);
  return (
    // <React.Fragment>
    props.boxView || props.isDesktop ? (
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
        <div>
          {Array.isArray(props.reminders)
            ? props.reminder.map((r, i) => {
              return (
                <div key={i}>
                  {/* {r.invoiceId === props.id ? ( */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <p className="invoice-list-reminder" style={{ margin: 'auto' }}>
                        {r.remind.toUpperCase()}
                      </p>
                      {console.log(r)}
                      {r.isEmail ? (
                        <i
                          className="fas fa-envelope-open fa-fw"
                          style={{ marginRight: '1rem', marginLeft: '1rem' }}
                        />
                      ) : (
                        <i
                          className="fas fa-mobile-alt"
                          style={{ marginRight: '1rem', marginLeft: '1rem' }}
                        />
                      )}
                      <button type="submit" onClick={() => props.deleteSms(r._id, props.history)}>
                        <i className="fa fa-bell-slash" />
                      </button>
                    </div>
                  {/* ) : null} */}
                </div>
              );
            })
            : null}
          {/* <i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />; */}
        </div>
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
        {/* <div className="invoice-list-box">
            <span
              className="invoice-list-pdf"
              onClick={() => props.togglePdf(props.invoiceID, 'showpdf')}
            >
              Invoice PDF
              <i className="fas fa-paperclip" />
            </span>
          </div>
          <div className="invoice-list-box">
            <p className="invoice-list-reminder">
              Weekly
              <i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />
              <i className="fas fa-mobile-alt" style={{ marginLeft: '0.5rem' }} />
            </p>
          </div> */}
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
        <div className="invoice-list-box">
          <div className="invoice-list-reminder">
            {console.log(props.reminders)}
            {Array.isArray(props.reminders)
              ? props.reminders.map((r, i) => {
                return (
                  <div key={i}>
                    {/* {console.log(r.invoiceId, props.id)} */}
                    {/* {r.invoiceId === props.id ? ( */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className="invoice-list-reminder" style={{ margin: 'auto' }}>
                          {r.remind.toUpperCase()}
                        </p>
                        {console.log(r)}
                        {r.isEmail ? (
                          <i
                            className="fas fa-envelope-open fa-fw"
                            style={{ marginRight: '1rem', marginLeft: '1rem' }}
                          />
                        ) : (
                          <i
                            className="fas fa-mobile-alt"
                            style={{ marginRight: '1rem', marginLeft: '1rem' }}
                          />
                        )}
                        <button
                          type="submit"
                          onClick={() => props.deleteSms({ reminderId: r._id, invoiceId: r.invoiceId })
                            }
                        >
                          <i className="fa fa-bell-slash" />
                        </button>
                      </div>
                    {/* ) : null} */}
                  </div>
                );
              })
              : null}
          </div>
        </div>
        {/* <div>{props.isPdfToggled ? props.history.push('/pdf') : null}</div> */}
        {/* reminders */}

        {/* <div><i className="far fa-envelope" style={{ marginLeft: '0.5rem' }} />;</div> */}
      </div>
    )
    // </React.Fragment>
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
