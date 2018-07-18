import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const ISAUTH = 'ISAUTH';
export const SET_ID = 'SET_ID';
export const SUCCESS = 'SUCCESS';
export const ADD_INVOICE = 'ADD_INVOICE';

const token =  localStorage.getItem('id');
axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
////////Auth
export function setId(id) {
  return {
    type: SET_ID,
    payload: id,
  };
}
export function authError(error) {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
};

export function login(credentials, history) {
  return dispatch => {
    axios.post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('id', res.data.token);
        // dispatch({ type: LOGIN, payload: res.data });
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        if (err.response.data === "Unauthorized") { dispatch(authError('Username/Password invalid.')); }
      });
  };
}

export function register(credentials, history) {
  return dispatch => {
    axios.post('/api/register', credentials)
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
}

export function logout(history) {
  return dispatch => {
    localStorage.removeItem('id');
    history.push('/');
  };
};
// { header: { Authorization: `bearer ${token}` } }

export function changePassword(newPassword, history) {
  return dispatch => {
    console.log(newPassword);
    axios.post('/api/changepassword', newPassword)
      .then(res => {
        console.log(res);
        dispatch({type: 'SUCCESS', payload: 'Successfully changed your password' });
        // history.push('/invoices');
      })
      .catch(error => {
        if (error)console.log('error: ', error.response);
      });
  };
}

export function addInvoice(credentials, pdf, history) {
  return dispatch => {
    console.log({ ...credentials, pdf });
    axios.post('/api/addinvoice', credentials)
      .then(res => {
        console.log(res);
        // dispatch({ type: LOGIN, payload: res.data });
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        if (err.response.data === "Unauthorized") { dispatch(authError('Username/Password invalid.')); }
      });
  };
}
