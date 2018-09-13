import React from 'react';

import SMS from './smsData';
import Emails from './emailData';

const Reminders = props => {
  return (
    <div>
      <div>
        <SMS reminders={props.reminders} />
      </div>
      <div>
        <Emails reminders={props.reminders} />
      </div>
    </div>
  );
};
export default Reminders;
