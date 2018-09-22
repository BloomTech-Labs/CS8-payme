import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import SideNav from '../sidebar';

import Emails from './data/emailData';
import SMS from './data/smsData';

import { allReminders } from '../../actions/smsReminders';

BigCalendar.momentLocalizer(moment);

class RemindersHome extends Component {
  componentDidMount() {
    this.props.allReminders();
    console.log(this.props.areminders);
  }

  eventStyler = event => {
    const eventStyles = {
      backgroundColor: '',
    };

    if (event.isEmail === false) {
      eventStyles.backgroundColor = '#000000';
    }
    return { style: eventStyles };
  };

  render() {
    const { invoices, reminders, areminders } = this.props;
    // console.log(invoices);

    return (
      <div className="reminder">
        <SideNav />
        <div className="home">
          <div className="reminder-navigation">
            Reminders home
            <Link to="/createreminders">
              <div>
                <p>
                  Create
                  <i className="fas fa-plus fa-fw" />
                </p>
              </div>
            </Link>
          </div>

          <div style={{ border: '2px solid black' }}>
            {areminders ? (
              <div>
                <SMS reminders={areminders} />
                <Emails reminders={areminders} />
              </div>
            ) : (
              <div>Reminding reminders...</div>
            )}
          </div>
          <div style={{ height: '100%', padding: '10px', width: '80%' }}>
            {areminders ? (
              <BigCalendar
                events={areminders}
                startAccessor={event => {
                  return moment(event.start).toDate();
                }}
                endAccessor={event => {
                  return moment(event.end).toDate();
                }}
                views={['month', 'day', 'week']}
                eventPropGetter={this.eventStyler}
              />
            ) : (
              <div>Reminding reminders...</div>
            )}
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
    areminders: state.reminder.areminders,
  };
};

export default connect(
  mapStateToProps,
  { allReminders },
)(RemindersHome);
