import React from 'react';

export default props => {
  return (
    <div>
      <div>
        <h1>Invoice {props.invoice.number} has already been paid</h1>
      </div>
    </div>
  );
};
