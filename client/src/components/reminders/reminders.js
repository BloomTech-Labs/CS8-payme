import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
import Dropdown from './dropdown';

class Reminders extends Component {

  componentDidMount() {
    this.props.getAllInvoices();
  }

  render() {
    const { invoices } = this.props;
    return (
      <div className="reminder">
        <Sidebar />
        <div className="reminder-container">
          <div className="reminder-drop">  
            <Dropdown invoices={invoices} getInvoice={this.props.getInvoice} />
          </div>
        </div>
      </div>
     )
  }
}
const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    message: state.invoice.success,
  };
};

export default connect(mapStateToProps, { getAllInvoices, getInvoice })(Reminders);
