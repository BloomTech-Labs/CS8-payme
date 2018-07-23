import React, { Component } from 'react';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem('id')) this.props.history.push('/signin');
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

  return (RequireAuthentication);
};
