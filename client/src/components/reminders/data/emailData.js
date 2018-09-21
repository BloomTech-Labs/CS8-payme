import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteSms } from '../../../actions/smsReminders';

const Emails = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  return (
    <div>
      Remind by Email:
      {emailReminders.map((r, i) => {
        let start = moment(r.start);
        start = start.format('MM ddd hh:mm');
        let end = moment(r.end);
        end = end.format('MM ddd hh:mm');
        return (
          <div style={{ border: '1px solid blue' }} key={i}>
            <span>
              <i className="fas fa-envelope-open fa-fw" />
            </span>
            <div>{r.title}</div>
            {r.remind !== 'custom' ? (
              <p>
                {start} - {end}
              </p>
            ) : (
              <p>{start}</p>
            )}
            <p>{r.remind}</p>
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
