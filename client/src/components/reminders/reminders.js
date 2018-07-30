import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
import Dropdown from './dropdown';
import { addReminder } from '../../actions/smsReminders';
import RemindForm from './reminderForm';

class Reminders extends Component {
  state = {
    reminderr: {
      id: null,
      option: '',
      message: '',
      rPhone: '',
    },
  };

  componentDidMount() {
    this.props.getAllInvoices();
  }

  handleSubmit = content => {
    // this.props.addReminder(content, this.props.history);
    console.log(content);
  };

  handleInvoice(id, phone) {
    // const stringNumber = phone.toString();
    this.setState(state => ({
      ...state,
      reminderr: {
        ...state.reminderr,
        ...id,
        ...phone,
      },
    }));

    // console.log(invoice);
  }

  handleChange(e) {
    this.setState(state => ({
      ...state,
      reminderr: {
        ...state.reminderr,
        ...e,
      },
    }));
  }

  render() {
    const { invoices } = this.props;
    const { reminderr } = this.state;
    console.log(reminderr);
    // const { handleSubmit } = this.props;

    return (
      <div className="reminder">
        <Sidebar />
        <div className="reminder-container">
          <div className="reminder-drop">
            {/* <Dropdown
              invoices={invoices}
              getInvoice={(id, phone) => this.handleInvoice({ invoiceId: id, rPhone: phone })}
            /> */}
          </div>
          <div>
            <RemindForm
              // handleRadio={this.handleRadio}
              handleMessage={e => this.handleChange({ message: e.target.value })}
              handleRadio={e => this.handleChange({ option: e.target.value })}
              option={reminderr.option}
              invoices={invoices}
              getInvoice={(id, phone) => this.handleInvoice({ id, rPhone: phone })}
              handleSubmit={() => this.handleSubmit(reminderr)}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    invoice: state.invoice.currentInvoice,
    message: state.invoice.success,
    reminders: state.reminder.reminders,
  };
};

export default connect(
  mapStateToProps,
  { getAllInvoices, getInvoice, addReminder },
)(Reminders);
