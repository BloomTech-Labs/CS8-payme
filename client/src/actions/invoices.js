import axios from 'axios';
// INVOICES
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const SUCCESS = 'SUCCESS';
export const ADD_INVOICE = 'ADD_INVOICE';
export const ALL_INVOICE = 'ALL_INVOICE';
export const INVOICE_IDX = 'INVOICE_IDX';
export const CURRENT_INVOICE = 'CURRENT_INVOICE';
// JWT
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
};

export function getAllInvoices() {
  return dispatch => {
    axios.get('/api/invoices', { header: { Authorization: `bearer ${token}` } })
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

export function addInvoice(credentials, history) {
  return dispatch => {
    // adjusting credentials to fit Invoice schema
    console.log(credentials);
    const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
    axios.post('/api/addinvoice', data, { header: { Authorization: `bearer ${token}` } })
      .then(res => {
        dispatch(getAllInvoices());
        history.push('/invoices');
      })
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function updateInvoice(credentials, history) {
  return dispatch => {
    console.log(credentials);
    const data = { ...credentials, email: { address: credentials.email }, phone: { number: credentials.phone } };
    const invNumber = credentials.number;
    axios.put(`/api/updateinvoice/${invNumber}`, data)
      .then(res => {
        dispatch(getAllInvoices());
        history.push('/invoices');
        console.log(res);
      })
      .catch(err => dispatch(authError('Error adding an invoice', err)));
  };
}

export function deleteInvoice(invoiceNumber, history) {
  return dispatch => {
    console.log(invoiceNumber);
    axios.delete(`/api/deleteinvoice/${invoiceNumber}`)
      .then(res => {
        console.log(res);
        dispatch(getAllInvoices());
        history.push('/invoices');
      })
      .catch(err => dispatch(authError('Error deleting invoice', err)));
  };
}

export function handleInvoiceIdx(inputID, history) {
  return (dispatch, getState) => {
    console.log(inputID);
    const { invoices } = getState().invoice;
    invoices.forEach((invoice, i) => {
      if (invoice._id === inputID) {
        dispatch({ type: 'INVOICE_IDX', payload: i });
        dispatch({ type: 'CURRENT_INVOICE', payload: invoice });
      }
    });
    history.push('/viewinvoice');
  };
};
