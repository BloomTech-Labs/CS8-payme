import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SideNav from '../sidebar';

import Emails from './data/emailData';
import SMS from './data/smsData';

import { allReminders } from '../../actions/smsReminders';

class RemindersHome extends Component {
  componentDidMount = () => {
    this.props.allReminders();
  };

  render() {
    const { invoices, reminders, areminders } = this.props;
    console.log(areminders);

    return (
      <div className="reminder">
        <SideNav />
        <div className="home">
          <div className="reminder-navigation">
            Reminders home
            <Link to="/createreminders">
              <div> \/\/\\/\/\/\///\//\// </div>
            </Link>
          </div>

          <div>
            {areminders ? (
              <div>
                <SMS reminders={areminders} />
                <Emails reminders={areminders} />
              </div>
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
