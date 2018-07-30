import React, { Component } from 'react';

export default class ConnectStripe extends Component {
  render() {
    return (
      <div>
        <a
          href={`${process.env.HOST
            || 'http://localhost:5000'}/stripe/authorize?jwt=${localStorage.getItem('id')}`}
        >
          This Component is for the user to connect their stripe account to their payMe account
        </a>
      </div>
    );
  }
}
