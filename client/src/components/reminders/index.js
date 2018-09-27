import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import SideNav from '../sidebar';

import CreateReminder from './reminders';

import Emails from './data/emailData';
import SMS from './data/smsData';

import { allReminders } from '../../actions/smsReminders';

BigCalendar.momentLocalizer(moment);

class RemindersHome extends Component {
  state = {
    toggle: false,
  };

  componentDidMount() {
    this.props.allReminders();
    console.log(this.props.areminders);
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

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
            <hr className="navigation-line" />
            {/* <Link to="/createreminders"> */}
            <div className="create_reminder" onClick={() => this.toggle()}>
              <p>
                Create
                <i className="fas fa-plus fa-fw" />
              </p>
            </div>
            {/* </Link> */}
            <hr className="navigation-line" />
          </div>
          {this.state.toggle ? (
            <div>
              <CreateReminder
                toggle={this.toggle}
                toggler={this.state.toggle}
                history={this.props.history}
              />
            </div>
          ) : null}

          {areminders ? (
            <div
              style={{
                display: 'flex',
                padding: '1rem',
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
                  height: '100%',
                  width: '60%',
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
