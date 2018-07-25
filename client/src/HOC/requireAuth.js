import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { autoLogin } from '../actions/auth';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    async componentWillMount() {
      // if (!localStorage.getItem('id')) this.props.history.push('/signin');
      // console.log(axios);
      // axios
      //   .get('/api/login', { headers: { Authorization: `bearer ${localStorage.getItem('id')}` } })
      //   .then(res => {
      //     localStorage.setItem('id', res.data.token);
      //   })
      //   .catch(err => {
      //     this.props.history.push('/signin');
      //   });
      const { code, scope } = queryString.parse(this.props.history.location.search);
      if (code && scope) {
        //  need to update active user to add code and scope
        // console.log({ stripe: query });
        axios
          .post('/api/usi', { stripe: { code, scope } })
          .then(res => {
            this.props.history.push('/billing');
          })
          .catch(err => console.log(err));
      }
      const token = localStorage.getItem('id');
      if (token) {
        this.props.autoLogin(token, this.props.history);
      } else {
        this.props.history.push('/signin');
      }

      // console.log(query);
    }

    render() {
      // console.log(axios);
      return <ComposedComponent {...this.props} />;
    }
  }

  return connect(
    null,
    { autoLogin },
  )(RequireAuthentication);
};
