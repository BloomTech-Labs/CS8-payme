import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { addReminder } from '../../actions/smsReminders';

const ReminderForm = props => {
  return (
    <div className="reminderform">
      <div className="reminderform-drop">
        <h1>Invoices:</h1>
        <Dropdown
          className="dropdown"
          placeholder="Choose invoice by name"
          // value="testing"
          closeOnChange
          search
          selection
          onChange={() => {
            props.onSelect();
          }}
          options={props.invoices.map((invoice, i) => {
            return (
              <div className="dropdown-option" key={i}>
                <p
                  tabIndex="0"
                  className={props.selected ? 'dropdown-select' : null}
                  onClick={() => {
                    props.onSelect();
                    props.getInvoice(invoice._id, invoice.phone.number, invoice.clientName);
                  }}
                >
                  {invoice.clientName}
                </p>
              </div>
            );
          })}
        />
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
    </div>
  );
};

export default connect(
  null,
  { addReminder },
)(ReminderForm);

// <div>
//   <form className="reminderform-radio">
//     <div>
//       <label>
//         <input
//           type="radio"
//           value="daily"
//           checked={props.option === 'daily'}
//           onChange={props.handleRadio}
//         />
//         Daily
//             </label>
//     </div>
//     <div>
//       <label>
//         <input
//           type="radio"
//           value="weekly"
//           checked={props.option === 'weekly'}
//           onChange={props.handleRadio}
//         />
//         Weekly
//             </label>
//     </div>
//     <div>
//       <label>
//         <input
//           type="radio"
//           value="monthly"
//           checked={props.option === 'monthly'}
//           onChange={props.handleRadio}
//         />
//         Monthy
//             </label>
//     </div>
//   </form>

// </div>
