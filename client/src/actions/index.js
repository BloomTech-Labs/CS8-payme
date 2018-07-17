import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const ISAUTH = 'ISAUTH';
export const SET_ID = 'SET_ID';
////////Action
export const setId = id => {
  return {
    type: SET_ID,
    payload: id,
  };
};
export const authError = error => {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
};

export const login = (username, password, history) => {
  return dispatch => {
    axios.post('http://localhost:5000/api/login', { username, password })
      .then(res => {
        localStorage.setItem('id', res.data.token);
        // dispatch({ type: LOGIN, payload: res.data });
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err.response);
        if (err.response.data === "Unauthorized") { dispatch(authError('Username/Password invalid.')); }
      });
  };
};

export const register = (username, password, firstName, lastName, phone, history) => {
  return dispatch => {
    axios.post('http://localhost:5000/api/register', {
      username, password, firstName, lastName, phone,
    })
      .then(res => {
        localStorage.setItem('id', res.data.token);
        // dispatch({ type: LOGIN, payload: res.data });
        history.push('/invoices');
      })
      .catch(error => {
        if (error)console.log('error: ', error.response);
        else if (error.response.data.err.errors) {
          dispatch(authError('Your username must be a valid email address.'));
        } else if (error.response.data.err.errmsg) {
          dispatch(authError('This username already exists.'));
        }
      });
  };
};

export const logout = history => {
  return dispatch => {
    localStorage.removeItem('id');
    history.push('/');
  };
};
