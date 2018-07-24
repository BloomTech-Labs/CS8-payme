import React, { Component } from 'react';
import axios from 'axios';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      // if (!localStorage.getItem('id')) this.props.history.push('/signin');
      // console.log(axios);
      axios
        .get('/api/login', { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
        .then(res => {
          localStorage.setItem('id', res.data.token);
        })
        .catch(err => {
          this.props.history.push('/signin');
        });
    }

    render() {
      // console.log(axios);
      return <ComposedComponent {...this.props} />;
    }
  }

  return RequireAuthentication;
};
