import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import DateTimePicker from 'react-datetime-picker';
import { addReminder } from '../../../actions/smsReminders';

const ReminderForm = props => {
  return (
    <div className="reminderform">
      <React.Fragment>
        <div className="input_section">
          <div className="reminderform-drop">
            <h1>Invoices</h1>
            {props.dropdown ? (
              <Dropdown
                className="dropdown"
                // placeholder="Choose invoice by name"
                selection
                closeOnChange
                text={props.title}
                options={props.invoices.map((invoice, i) => {
                  return (
                    <div className="dropdown-option" key={invoice._id}>
                      <span
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
                        {invoice.clientName}
                        <span style={{ margin: '1rem 0 0 0' }}>#{invoice.number}</span>
                      </span>
                    </div>
                  );
                })}
              />
            ) : null}
          </div>

          <div className="reminderform-calendars">
            <div>
              <h1>Start date</h1>
              {/* <p>When do you want to start?</p> */}
              <DateTimePicker onChange={props.startChange} value={props.formData.start} />
            </div>
            <br />
            <div>
              <h1>End date</h1>
              {/* <p>When do you want the reminding to stop?</p> */}
              <DateTimePicker onChange={props.endChange} value={props.formData.end} />
            </div>
          </div>

          {/* <div className="input_section"> */}
          <div className="reminder-radios_menu">
            <h1>Send as</h1>
            <div className="reminder-radios">
              <div className="reminder-select">
                <input
                  type="radio"
                  value="true"
                  checked={props.isEmail === 'true'}
                  onChange={props.handleEmail}
                />
                <label>Email</label>
              </div>

              <div className="reminder-select">
                <input
                  type="radio"
                  value="false"
                  checked={props.isEmail === 'false' || props.isEmail === false}
                  onChange={props.handleEmail}
                />
                <label>Sms</label>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </React.Fragment>

      {/* {props.cmessage ? ( */}
      <React.Fragment />
      <div className="reminderform-message">
        <h1>Custom message</h1>
        <textarea
          type="body"
          placeholder="Reminder to..."
          className="reminderform-message-input"
          onChange={props.handleMessage}
        />
      </div>
      <div className="rButton_container">
        <button
          className="addreminder-button connect-stripe_button"
          type="submit"
          onClick={() => {
            props.addReminder(props.formData, props.history);
          }}
        >
          Save{' '}
        </button>
      </div>
      {/* ) : null} */}
    </div>
  );
};

export default connect(
  null,
  { addReminder },
)(ReminderForm);
