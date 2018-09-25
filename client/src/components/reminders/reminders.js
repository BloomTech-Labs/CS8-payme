import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
// import Dropdown from './dropdown';
import { addReminder, allReminders } from '../../actions/smsReminders';
import RemindForm from './functional/reminderForm';

class Reminders extends Component {
  state = {
    reminder: {
      invoiceId: '',
      remind: 'custom',
      message: '',
      rPhone: '',
      email: '',
      title: '',
      amount: null,
      isEmail: false,
      company: '',
      start: new Date(),
      end: new Date(),
    },
    dropdown: true,
    Custmessage: false,
    calendar: false,
    selected: false,
  };

  componentDidMount() {
    this.props.getAllInvoices();
    // this.props.allReminders();
  }

  onSelect = () => this.setState({ selected: !this.state.selected });

  toggle = msg => {
    console.log('hey');
    if (msg === 'cal') {
      this.setState({ dropdown: false, Custmessage: false, calendar: true });
    }
    // this.setState({ calendar: true });
    if (msg === 'sms') {
      this.setState({ Custmessage: true, calendar: false });
    }
  };

  startChange(start) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...start,
      },
    }));
  }

  endChange(end) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...end,
      },
    }));
  }

  handleChange(e) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...e,
      },
    }));
  }

  handleInvoice(id, phone, name, amount) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...id,
        ...phone,
        ...name,
        ...amount,
      },
    }));
  }

  render() {
    const { invoices, reminders } = this.props;
    const { reminder } = this.state;
    // const { invoice } = this.props;
    console.log(reminders);
    console.log(reminder);
    return (
      <div className="reminder">
        <Sidebar />
        <div className="reminder-container">
          <div className="reminder-navigation">
            <Link to="/reminders">
              <span>
                <i className="fas fa-arrow-left add fa-fw" />
              </span>
            </Link>
          </div>

          {/* {this.state.calendar ? ( */}
          {/* <div className="reminder-calendar"> */}
          {/* <div className="calendar_header">
              <p> Select desired date</p>
              <p onClick={() => this.toggle('sms')}>
                <i
                  style={{ cursor: 'pointer' }}
                  className="fas fa-arrow-left remind fa-flip-horizontal"
                />
              </p>
            </div> */}

          {/* <DateTimePicker
              onChange={start => this.startChange({ start })}
              value={reminder.start}
            />
            <br />
            <DateTimePicker onChange={end => this.endChange({ end })} value={reminder.end} /> */}
          {/* </div> */}
          {/* ) : null} */}

          <div className="reminder-form_container">
            <RemindForm
              startChange={start => this.startChange({ start })}
              endChange={end => this.endChange({ end })}
              handleMessage={e => this.handleChange({ message: e.target.value })}
              handleEmail={e => this.handleChange({ isEmail: e.target.value })}
              handleRemind={e => this.handleChange({ remind: e.target.value })}
              getInvoice={(id, phone, name, amount, email, company) => this.handleInvoice({
                invoiceId: id,
                rPhone: phone,
                title: name,
                amount,
                email,
                company,
              })}
              remind={reminder.remind}
              isEmail={reminder.isEmail}
              title={reminder.title}
              invoices={invoices}
              formData={reminder}
              history={this.props.history}
              selected={this.state.selected}
              onSelect={this.onSelect}
              togCalendar={this.toggle}
              dropdown={this.state.dropdown}
              cmessage={this.state.Custmessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  calendarStyles: {},
};

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
  {
    getAllInvoices,
    getInvoice,
    addReminder,
    allReminders,
  },
)(Reminders);
