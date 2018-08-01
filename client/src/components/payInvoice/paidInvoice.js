import React from 'react';

export default props => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', height:'60rem',alignItems:'center'}}>
      <div>
        <h1 className="signin--box--title" style={{marginBottom:'5rem'}}>
          payMe
          <span className="signin--box--dot">
          .
          </span>
          <br />
        </h1>
        <h1>Invoice {props.invoice.number} has already been paid</h1>
      </div>
    </div>
  );
};
