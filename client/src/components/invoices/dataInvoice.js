import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../actions';

const Datainvoice = (props) => {
  return ( 
      <div className="invoice-data" onClick={() => props.handleNoteIndex(props.id, props.history)}>
        <div className="invoice-data-flex">
          <p className="invoice-data-id">#{props.invoiceID}</p>
          <i className="far fa-edit"></i>
        </div>
        <p className="invoice-data-name">{props.clientName}</p>
        <p className="invoice-data-company">{props.company}</p>
        <p><span className="invoice-data-pdf"> Invoice PDF</span></p>
        <hr className="invoice-data-hr"/>
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
