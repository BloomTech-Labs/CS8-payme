import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { deleteSms } from '../../../actions/smsReminders';

const SMS = props => {
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div>
      Remind by sms:
      {smsReminders.map((r, i) => {
        let start = moment(r.start);
        start = start.format('MM ddd hh:mm');
        let end = moment(r.end);
        end = end.format('MM ddd hh:mm');
        // console.log(start);
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }} key={i}>
            <span>
              <i className="fas fa-mobile-alt" />
            </span>
            <p>{r.title}</p>
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
)(SMS);
