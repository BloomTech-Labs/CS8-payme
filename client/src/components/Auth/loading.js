import React, { Component } from 'react';
import auth0 from 'auth0';
import axios from 'axios';
import { connect } from 'react-redux';

class Loading extends Component {
  state = {};

  render() {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Loading);
