import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../actions';

const Datainvoice = (props) => {
  return ( 
      <div className="invoice-data" onClick={() => props.handleNoteIndex(props.id, props.history)}>
      <p>{props.invoiceID}</p>
          <p>{props.clientName}</p>
          <p>{props.company}</p>
          <p>phone number <span className="invoice-pdf"> Invoice PDF</span></p>
          <hr />
          <p>Weekly</p>
      </div>
  );
};
const mapStateToProps = state => {
  return {
    success: state.auth.success,
  };
};

export default connect(mapStateToProps, { changePassword })(Datainvoice);
