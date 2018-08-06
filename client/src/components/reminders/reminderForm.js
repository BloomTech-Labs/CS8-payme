import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { addReminder } from '../../actions/smsReminders';

const ReminderForm = props => {
  return (
    <div>
      <div className="reminderform">
        <div className="dropdown">
          <Dropdown
            className="reminder-dropdown"
            placeholder="Choose invoice by name: "
            closeOnChange
            search
            selection
            options={props.invoices.map((invoice, i) => {
              return (
                <div className="reminder-dropdown-option" key={i}>
                  <div
                    onClick={() => props.getInvoice(invoice._id, invoice.phone.number, invoice.clientName)
                    }
                  >
                    {invoice.clientName}
                  </div>
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
              className="addreminder-button"
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
