import axios from 'axios';
import { getAllInvoices } from './invoices';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const DE_AUTH = 'DE_AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

const token =  localStorage.getItem('id');
axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

////////////////////////////////////
// Auth
////////////////////////////////////

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
        axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
        dispatch(getAllInvoices());
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        if (err.response) { dispatch(authError('Username/Password invalid.')); }
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
    dispatch({ type: 'DE_AUTH' });
    localStorage.removeItem('id');
    history.push('/');
  };
};
// { header: { Authorization: `bearer ${token}` } }

export function changePassword(newPassword, history) {
  return dispatch => {
    axios.post('/api/changepassword', newPassword)
      .then(res => {
        dispatch({type: 'AUTH_SUCCESS', payload: 'Successfully changed your password' });
        // history.push('/invoices');
      })
      .catch(error => {
        if (error)console.log('error: ', error.response);
        dispatch(authError('Error changing your password', error));
      });
  };
}
// /////////////////////////////////////
// // Invoices
// ////////////////////////////////////

// export function addInvoice(credentials, history) {
//   return dispatch => {
//     // adjusting credentials to fit Invoice schema
//     const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
//     axios.post('/api/addinvoice', data)
//       .then(res => {
//         dispatch(getAllInvoices());
//         history.push('/invoices');
//       })
//       .catch(err => dispatch(authError('Error adding an invoice', err)));
//   };
// }

// export function updateInvoice(credentials, history) {
//   return dispatch => {
//     console.log(credentials);
//     const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
//     const invNumber = credentials.number;
//     axios.put(`/api/updateinvoice/${invNumber}`, data)
//       .then(res => {
//         dispatch(getAllInvoices());
//         history.push('/invoices');
//         console.log(res);
//       })
//       .catch(err => dispatch(authError('Error adding an invoice', err)));
//   };
// }

// export function deleteInvoice(invoiceNumber, history) {
//   return dispatch => {
//     console.log(invoiceNumber);
//     axios.delete(`/api/deleteinvoice/${invoiceNumber}`)
//       .then(res => {
//         console.log(res);
//         dispatch(getAllInvoices());
//         history.push('/invoices');
//       })
//       .catch(err => dispatch(authError('Error deleting invoice', err)));
//   };
// }

//////////////////////////
// Misc
//////////////////////////
// export function handleInvoiceIdx(inputID, history) {
//   return (dispatch, getState) => {
//     console.log(inputID);
//     const { invoices } = getState().auth;
//     invoices.forEach((invoice, i) => {
//       if (invoice._id === inputID) {
//         dispatch({ type: 'INVOICE_IDX', payload: i });
//         dispatch({ type: 'CURRENT_INVOICE', payload: invoice });
//       }
//     });
//     history.push('/viewinvoice');
//   };
// };
