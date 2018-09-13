import React from 'react';
import { connect } from 'react-redux';

import { deleteSms } from '../../../actions/smsReminders';

const Reicons = props => {
  // console.log(props);
  return (
    <div>
      <span>
        <p>{props.invReminders.remind}</p>
        {props.invReminders.isEmail ? (
          <i
            className="fas fa-envelope-open fa-fw"
            style={{ marginRight: '1rem', marginLeft: '1rem' }}
          />
        ) : (
          <i className="fas fa-mobile-alt" style={{ marginRight: '1rem', marginLeft: '1rem' }} />
        )}
        {/* <span
          onClick={() => props.deleteSms({ reminderId: props.invReminders._id, invoiceId: props.invId })
          }
        >
          <i className="fa fa-bell-slash" />
        </span> */}
      </span>
    </div>
  );
};

export default Reicons;
