import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const SUCCESS = 'SUCCESS';
export const ADD_INVOICE = 'ADD_INVOICE';
export const ALL_INVOICE = 'ALL_INVOICE';
export const INVOICE_IDX = 'INVOICE_IDX';
export const CURRENT_INVOICE = 'CURRENT_INVOICE';
export const ARRAY_MOVE = 'ARRAY_MOVE';


const token =  localStorage.getItem('id');
axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

/////////////////////////////////////
// Invoices
////////////////////////////////////

export function authError(error) {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
}

export function getAllInvoices() {
  return dispatch => {
    axios.get('/api/invoices', { headers: { Authorization: `bearer ${token}` } })
      .then(res => {
        dispatch({ type: ALL_INVOICE, payload: res.data });
        // history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        dispatch(authError('Error retrieving invoices', err));
      });
  };
}


export function addInvoice(credentials, history, config) {
  return dispatch => {
    // adjusting credentials to fit Invoice schema
    const data = { ...credentials,
      email: {
        address: credentials.email
      },
      phone: {
        number: credentials.phone
      },
    };
    console.log(data);
    axios.post('/api/addinvoice', data, config, { headers: { Authorization: `bearer ${token}` } })
      .then(res => history.push('/invoices'))
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function updateInvoice(credentials, history) {
  return dispatch => {
    const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
    const invNumber = credentials.number;
    axios.put(`/api/updateinvoice/${invNumber}`, data, { headers: { Authorization: `bearer ${token}` } })
      .then(res => {
        history.push('/invoices');
        console.log(res);
      })
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function deleteInvoice(invoiceNumber, history) {
  return dispatch => {
    console.log(invoiceNumber);
    axios.delete(`/api/deleteinvoice/${invoiceNumber}`, { headers: { Authorization: `bearer ${token}` } })
      .then(res => {
        console.log(res);
        history.push('/invoices');
      })
      .catch(err => dispatch(authError('Error deleting invoice', err)));
  };
}

export function getInvoice(id) {
  return dispatch => {
    axios.get(`/api/invoices/${id}`, { headers: { Authorization: `bearer ${token}` } })
      .then(res => {
        console.log(res.data);
        dispatch({ type: 'CURRENT_INVOICE', payload: res.data });
        // history.push({ pathname: `/invoice/${res.data.number}` });
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        dispatch(authError('Error retrieving invoices', err));
      });
  };
}

export function handleInvoiceIdx(inputID, history) {
  return (dispatch, getState) => {
    const { invoices } = getState().invoice;
    console.log(inputID);
    invoices.forEach((invoice, i) => {
      if (invoice.number === inputID) {
        dispatch({ type: 'INVOICE_IDX', payload: i });
        dispatch({ type: 'CURRENT_INVOICE', payload: invoice });
        history.push({ pathname: `/invoice/${invoice.number}` });
      }
    });
  };
}

export const onSortEnd = orderList => {
  return {
    type: 'ARRAY_MOVE',
    payload: orderList,
  };
};
