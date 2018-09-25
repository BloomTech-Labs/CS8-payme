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
      // border: '1px solid white',
      borderRadius: '16px',
      fontSize: '12px',
      backgroundColor: '#ff4444',
    };

    if (event.isEmail === false) {
      eventStyles.backgroundColor = '#44d3ff';
      eventStyles.color = 'grey';
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
            <div className="create_reminder">
              <Link to="/createreminders">
                <p>
                  Create
                  <i className="fas fa-plus fa-fw" />
                </p>
              </Link>
            </div>
            <hr className="navigation-line" />
          </div>

          {areminders ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '100%',
                backgroundColor: '#f5f5f5',
              }}
            >
              <div className="rList">
                <SMS reminders={areminders} />

                <Emails reminders={areminders} />
              </div>

              <div
                style={{
                  height: '70%',
                  width: '70%',
                  marginLeft: '3px',
                }}
              >
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
              </div>
            </div>
          ) : (
            <div>Reminding reminders...</div>
          )}
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
