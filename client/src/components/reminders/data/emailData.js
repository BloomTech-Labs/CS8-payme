import React from 'react';

const Emails = props => {
  const emailReminders = props.reminders.filter(rem => {
    return rem.isEmail === true;
  });
  return (
    <div>
      {emailReminders.map((r, i) => {
        return (
          <div key={i}>
            <div>{r.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Emails;
