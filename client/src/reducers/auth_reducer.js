import {
  AUTHENTICATION_ERROR,
  DE_AUTH, AUTH_SUCCESS,
} from '../actions/auth';

// const initialState = {
//   message: '',
//   success: '',
//   invoices: [],
//   invoiceIdx: 0,
//   currentInvoice: '',
// };

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case DE_AUTH:
      return { ...state, invoices: [] };
    case AUTHENTICATION_ERROR:
      return { ...state, message: action.payload };
    case AUTH_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
