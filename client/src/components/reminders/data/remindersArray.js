import React from 'react';

import SMS from './smsData';
import Emails from './emailData';

const Reminders = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div>
      <div style={{ backgroundColor: 'red' }}>
        <SMS reminders={smsReminders} />
      </div>
      <div style={{ backgroundColor: 'blue' }}>
        <Emails reminders={emailReminders} />
      </div>
    </div>
  );
};
export default Reminders;
