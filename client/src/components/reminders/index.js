import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SideNav from '../sidebar';
import Reminders from './data/remindersArray';

import { allReminders } from '../../actions/smsReminders';

class RemindersHome extends Component {
  componentDidMount = () => {
    this.props.allReminders();
  };

  render() {
    const { invoices, reminders, areminders } = this.props;
    console.log(areminders);
    // console.log(this.state.list);
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
            {/* {invoices.map((inv, i) => {
              return
            })} */}
            {areminders ? <Reminders reminders={areminders} /> : <div>Reminding reminders...</div>}
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
