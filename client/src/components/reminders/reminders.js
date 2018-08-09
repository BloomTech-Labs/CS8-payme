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
      remind: 'weekly',
      message: '',
      rPhone: '',
      email: '',
      name: '',
      amount: null,
      isEmail: false,
      company: '',
    },
    date: new Date(),
    selected: false,
  };

  componentDidMount() {
    this.props.getAllInvoices();
    this.props.allReminders();
  }

  onSelect = () => this.setState({ selected: !this.state.selected });

  onChange = date => this.setState({ date });

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

  render() {
    const { invoices } = this.props;
    const { reminder } = this.state;
    console.log(reminder);
    return (
      <div className="reminder">
        <Sidebar />
        <div className="billing-container">
          <div className="billing-navigation">
            <div className="reminder-nav">
              <h1 className="reminder-nav-title">Set a Reminder</h1>
            </div>
          </div>
          <div className="billing-window">
            <div className="reminder-main">
              <div className="calendar-box">
                <Calendar
                  className="calendar"
                  style={styles.calendarStyles}
                  onChange={this.onChange}
                  value={this.state.date}
                />
              </div>
              <div className="reminder-form_container">
                <RemindForm
                  handleMessage={e => this.handleChange({ message: e.target.value })}
                  handleEmail={e => this.handleChange({ isEmail: e.target.value })}
                  handleRemind={e => this.handleChange({ remind: e.target.value })}
                  remind={reminder.remind}
                  isEmail={reminder.isEmail}
                  invoices={invoices}
                  getInvoice={(id, phone, name, amount, email, company) => this.handleInvoice({
                    id,
                    rPhone: phone,
                    name,
                    amount,
                    email,
                    company,
                  })
                  }
                  formData={reminder}
                  history={this.props.history}
                  selected={this.state.selected}
                  onSelect={this.onSelect}
                />
              </div>
            </div>
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
