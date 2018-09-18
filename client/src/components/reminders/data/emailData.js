import React from 'react';
import { connect } from 'react-redux';

import { deleteSms } from '../../../actions/smsReminders';

const Emails = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  return (
    <div>
      {emailReminders.map((r, i) => {
        return (
          <div style={{ backgroundColor: 'blue' }} key={i}>
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
