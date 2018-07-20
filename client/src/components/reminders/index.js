import React, { Component } from 'react';
import Calendar from 'react-calendar';
import Sidebar from '../sidebar';

class Reminders extends Component {
  state = {
    date: new Date(),
  };

  render() {
    return (
      <div className="reminder">
        <Sidebar />
        <div>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
      </div>
    );
  }
}

export default Reminders;
