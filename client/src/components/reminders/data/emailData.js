import React from 'react';
import { connect } from 'react-redux';

import { deleteSms } from '../../../actions/smsReminders';

const Emails = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  return (
    <div>
      Remind by Email:
      {emailReminders.map((r, i) => {
        return (
          <div style={{ border: '1px solid blue' }} key={i}>
            <span>
              <i className="fas fa-envelope-open fa-fw" />
            </span>
            <div>{r.name}</div>
            <span onClick={() => props.deleteSms({ reminderId: r._id, invoiceId: r.invoiceId })}>
              <i className="fa fa-bell-slash" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  null,
  { deleteSms },
)(Emails);
