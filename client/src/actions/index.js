import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';



export const authError = error => {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
};

export const login = (username, password, history) => {
  return async dispatch => {
    try {
      // const res = await axios.post('/payme/login', { username, password });
      // dispatch({ type: 'ADMIN', payload: res.data.user });
      await history.push('/invoices');
    } catch (err) {
      if (err) console.log('error: ', err);
        if (err.response.data.error)
          dispatch(authError('Username/Password invalid.'));
    }
  };
};

export const register = (username, password,firstName,lastName, phone, history) => {
  return async dispatch => {
    try {
      console.log(username, password,firstName,lastName, phone);
      await axios.post('http://localhost:5000/api/register', { username, password,firstName,lastName, phone });
      // await axios.post('/payme/login', { username, password });
      // console.log(username, password,firstName,lastName, phone);
      // dispatch({ type: 'ISAUTH' });
      // await history.push('/invoices');
    } catch (error) {
      if (error) console.log('error: ', error.response);
      else if (error.response.data.err.errors) {
        dispatch(authError('Your username must be a valid email address.'));
      } else if (error.response.data.err.errmsg) {
        dispatch(authError('This username already exists.'));
      }
    }
  };
};