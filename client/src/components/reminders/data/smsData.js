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
        start = start.format('M/DD h:mma');
        let end = moment(r.end);
        end = end.format('M/DD h:mma');
        // console.log(start);
        return (
          <div className="rCard" style={{ borderLeft: '4px solid #44d3ff' }} key={i}>
            <p>{r.title}</p>

            {r.remind !== 'custom' ? (
              <div className="rCard-date">
                <p>{start}</p> <div style={{ width: '22px', fontSize: '22px' }}> - </div>{' '}
                <p>{end}</p>
              </div>
            ) : (
              <p>{start}</p>
            )}

            <p style={{ fontSize: '12.5px' }}>{r.remind.toUpperCase()}</p>

            <span
              style={{ cursor: 'pointer' }}
              onClick={() => props.deleteSms({ reminderId: r._id, invoiceId: r.invoiceId })}
            >
              <i className="fas fa-trash-alt" />
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
