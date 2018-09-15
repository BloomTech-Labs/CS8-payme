import React from 'react';

const Emails = props => {
  return (
    <div>
      {props.reminders.map((r, i) => {
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
