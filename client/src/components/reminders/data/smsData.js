import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { deleteSms } from '../../../actions/smsReminders';

const SMS = props => {
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div style={{ margin: '2rem 0' }}>
      <div className="rType">
        sms Reminders{' '}
        <span style={{ margin: '1rem 3rem' }}>
          <i className="fas fa-mobile-alt" />
        </span>
      </div>

      {smsReminders.map((r, i) => {
        let start = moment(r.start);
        start = start.format('ddd MM/DD h:mm');
        let end = moment(r.end);
        end = end.format('ddd MM/DD h:mm');
        // console.log(start);
        return (
          <div className="rCard" style={{ borderLeft: '4px solid green' }} key={i}>
            <p>{r.title}</p>

            {r.remind !== 'custom' ? (
              <div className="rCard-date">
                <p style={{ color: '#62fff7' }}>{start}</p> - <p>{end}</p>
              </div>
            ) : (
              <p>{start}</p>
            )}

            <p>{r.remind.toUpperCase()}</p>

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
