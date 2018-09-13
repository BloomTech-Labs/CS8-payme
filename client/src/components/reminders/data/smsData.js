import React from 'react';

const SMS = props => {
  const smsReminders = props.reminders.filter(rem => {
    return rem.isEmail === false;
  });
  return (
    <div>
      {smsReminders.map((r, i) => {
        return (
          <div key={i}>
            <div>{r.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SMS;
