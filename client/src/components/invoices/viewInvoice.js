import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../actions';

const ViewInvoice = (props) => {
  return ( 
    <Link to="/viewinvoice" onClick={() => props.handleNoteIndex(props.note._id)}>
      <div className="invoice-data">
      <p>{props.invoiceID}</p>
          <p>{props.clientName}</p>
          <p>{props.company}</p>
          <p>phone number <span className="invoice-pdf"> Invoice PDF</span></p>
          <hr />
          <p>Weekly</p>
      </div>
    </Link>
  );
};
const mapStateToProps = state => {
  return {
    success: state.auth.success,
  };
};

export default connect(mapStateToProps, { changePassword })(ViewInvoice);
