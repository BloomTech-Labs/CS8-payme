import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setId } from '../actions';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem('id')) this.props.history.push('/signin');
      else this.props.setId(localStorage.getItem('id'));
    }

    render() {
      return (
        <div>
          {localStorage.getItem('id') && (
            <ComposedComponent {...this.props} />
          )}
        </div>
      );
    }
  }

  return connect(null, { setId })(RequireAuthentication);
};
