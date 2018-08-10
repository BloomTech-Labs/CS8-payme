import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { getAllInvoices, getInvoice } from '../../actions/invoices';
import Sidebar from '../sidebar';
// import Dropdown from './dropdown';
import { addReminder, allReminders } from '../../actions/smsReminders';
import RemindForm from './reminderForm';

class Reminders extends Component {
  state = {
    reminder: {
      id: null,
      remind: '',
      message: '',
      rPhone: '',
      email: '',
      name: '',
      amount: null,
      isEmail: false,
      company: '',
    },
    dropdown: true,
    Custmessage: false,
    calendar: false,
    date: new Date(),
    selected: false,
  };

  componentDidMount() {
    this.props.getAllInvoices();
    this.props.allReminders();
  }

  onSelect = () => this.setState({ selected: !this.state.selected });

  onChange = date => this.setState({ date });

  handleInvoice(id, phone, name, amount, remind) {
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...id,
        ...phone,
        ...name,
        ...amount,
        ...remind,
      },
    }));
  }

  handleChange(e) {
    // console.log(e.isEmail);
    this.setState(state => ({
      ...state,
      reminder: {
        ...state.reminder,
        ...e,
      },
    }));
  }

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

  render() {
    const { invoices } = this.props;
    const { reminder } = this.state;
    // const { invoice } = this.props;
    console.log(reminder.name);
    console.log(this.state.date.toString());
    console.log(reminder);
    return (
      <div className="reminder">
        <Sidebar />
        <div className="reminder-container">
          <div className="reminder-navigation">
            {reminder.name ? (
              <p style={{ marginRight: '5rem', marginLeft: '5rem' }}>
                CurrentInvoice:
                <span style={{ color: '#22CFB1' }}>{reminder.name}</span>
              </p>
            ) : null}
            {this.state.calendar || this.state.Custmessage ? (
            <div>
              <div>
                <p>
                  Date Selected:
                  <span style={{ color: '#22CFB1' }}>
                    {this.state.date.toString().slice(0, 25)}
                  </span>
                </p>
              </div>
              <div className="reminder-form_container">
                <RemindForm
                  handleMessage={e => this.handleChange({ message: e.target.value })}
                  handleEmail={e => this.handleChange({ isEmail: e.target.value })}
                  // handleRemind={e => this.handleChange({ remind: e.target.value })}
                  remind={reminder.remind}
                  isEmail={reminder.isEmail}
                  invoices={invoices}
                  getInvoice={(id, phone, name, amount, email, company, remind) => this.handleInvoice({
                    id,
                    rPhone: phone,
                    name,
                    amount,
                    email,
                    company,
                    remind,
                  })
                  }
                  formData={reminder}
                  history={this.props.history}
                  selected={this.state.selected}
                  onSelect={this.onSelect}
                />
              </div>
            </div>  
            ) : null}
          {/* <div className="reminder-layout"> */}
          {this.state.calendar ? (
            <div className="reminder-calendar">
              <div className="calendar_header">
                <p> Select desired date</p>
                <p onClick={() => this.toggle('sms')}>
                  <i
                    style={{ cursor: 'pointer' }}
                    className="fas fa-arrow-left remind fa-flip-horizontal"
                  />
                </p>
              </div>
              <Calendar
                className="calendar"
                style={styles.calendarStyles}
                onChange={this.onChange}
                value={this.state.date}
              />
            </div>
          ) : null}
          <div className="reminder-form_container">
            <RemindForm
              handleMessage={e => this.handleChange({ message: e.target.value })}
              handleEmail={e => this.handleChange({ isEmail: e.target.value })}
              handleRemind={e => this.handleChange({ remind: e.target.value })}
              remind={reminder.remind}
              isEmail={reminder.isEmail}
              invoices={invoices}
              getInvoice={(id, phone, name, amount, email) => this.handleInvoice({
                id,
                rPhone: phone,
                name,
                amount,
                email,
              })
              }
              formData={reminder}
              history={this.props.history}
              selected={this.state.selected}
              onSelect={this.onSelect}
              togCalendar={this.toggle}
              dropdown={this.state.dropdown}
              cmessage={this.state.Custmessage}
            />
          </div>
          {/* </div> */}
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
