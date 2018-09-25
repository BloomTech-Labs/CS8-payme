import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteSms } from '../../../actions/smsReminders';

const Emails = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="rType">
        email Reminders{' '}
        <span style={{ margin: '1rem 3rem' }}>
          <i className="fas fa-envelope-open fa-fw" />
        </span>
      </div>
      {emailReminders.map((r, i) => {
        let start = moment(r.start);
        start = start.format('MM/DD h:mma');
        let end = moment(r.end);
        end = end.format('MM/DD h:mma');
        return (
          <div className="rCard" style={{ borderLeft: '4px solid #ff4444' }} key={i}>
            <p>{r.title}</p>
            {r.remind !== 'custom' ? (
              <div className="rCard-date">
                <p>{start}</p> <div style={{ width: '19px' }}> - </div> <p>{end}</p>
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
)(Emails);
