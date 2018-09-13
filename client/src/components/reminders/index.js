import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SideNav from '../sidebar';
import Reminders from './data/remindersArray';

class RemindersHome extends Component {
  componentDidMount() {}

  render() {
    const { invoices, reminders } = this.props;
    // console.log(invoices);
    // console.log(reminders);
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
            {invoices.map((inv, i) => {
              return <Reminders key={i} reminders={inv.reminders} />;
            })}
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

export default connect(mapStateToProps)(RemindersHome);
