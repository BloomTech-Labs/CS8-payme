import React from 'react';
import { connect } from 'react-redux';

import { deleteSms } from '../../../actions/smsReminders';

const SMS = props => {
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div>
      {smsReminders.map((r, i) => {
        return (
          <div style={{ backgroundColor: 'red' }} key={i}>
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
)(SMS);
