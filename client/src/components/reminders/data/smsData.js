import React from 'react';
import { connect } from 'react-redux';

import { deleteSms } from '../../../actions/smsReminders';

const SMS = props => {
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div>
      Remind by sms:
      {smsReminders.map((r, i) => {
        return (
          <div style={{ border: '1px solid red' }} key={i}>
            <span>
              <i className="fas fa-mobile-alt" />
            </span>
            <p>{r.name}</p>
            <p>{r.date}</p>
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
)(SMS);
