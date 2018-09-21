import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import DateTimePicker from 'react-datetime-picker';
import { addReminder } from '../../../actions/smsReminders';

const ReminderForm = props => {
  return (
    <div className="reminderform">
      <Link to="/reminders">
        <span>
          <i className="fas fa-arrow-left add fa-fw" />
        </span>
      </Link>
      <div className="reminderform-drop">
        {props.dropdown ? (
          <React.Fragment>
            {/* <p onClick={() => props.togCalendar('cal')}>
              <i
                style={{ marginLeft: '40rem', cursor: 'pointer' }}
                className="fas fa-arrow-left fa-flip-horizontal fa-fw"
              />
            </p> */}
            <DateTimePicker onChange={props.startChange} value={props.formData.start} />
            <br />
            <DateTimePicker onChange={props.endChange} value={props.formData.end} />
            <h1>Select An Invoice</h1>
            <Dropdown
              className="dropdown"
              placeholder="Choose invoice by name"
              // closeOnChange
              search
              selection
              options={props.invoices.map((invoice, i) => {
                return (
                  <div className="dropdown-option" key={invoice._id}>
                    <span
                      tabIndex="0"
                      className={props.selected ? 'dropdown-select' : 'dropdown-not'}
                      onClick={() => {
                        props.onSelect();
                        props.getInvoice(
                          invoice._id,
                          invoice.phone.number,
                          invoice.clientName,
                          invoice.totalAmount,
                          invoice.email.address,
                          invoice.companyName,
                          invoice.remind,
                        );
                      }}
                    >
                      {invoice.clientName} -
                      <span style={{ margin: '1rem 0 0 0' }}> #{invoice.number}</span>
                    </span>
                  </div>
                );
              })}
            />
          </React.Fragment>
        ) : null}
      </div>
      {/* {props.cmessage ? ( */}
      <React.Fragment>
        <div className="reminder-radios_menu">
          <div className="reminder-radios">
            <div className="reminder-select">
              <label>Sms</label>
              <input
                type="radio"
                value="false"
                checked={props.isEmail === 'false' || props.isEmail === false}
                onChange={props.handleEmail}
              />
            </div>
            <div className="reminder-select">
              <label>Email</label>
              <input
                type="radio"
                value="true"
                checked={props.isEmail === 'true'}
                onChange={props.handleEmail}
              />
            </div>
          </div>
        </div>
        <div className="reminderform-message">
          <h1>Custom message:</h1>
          <textarea
            type="body"
            className="reminderform-message-input"
            onChange={props.handleMessage}
          />

          <div className="addreminder">
            <button
              className="addreminder-button connect-stripe_button"
              type="submit"
              onClick={() => {
                props.addReminder(props.formData, props.history);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
      {/* ) : null} */}
    </div>
  );
};

export default connect(
  null,
  { addReminder },
)(ReminderForm);
