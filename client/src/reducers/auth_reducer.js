import {
  AUTHENTICATION_ERROR,
  DE_AUTH, SUCCESS,
  ADD_INVOICE, ALL_INVOICE, INVOICE_IDX,
  CURRENT_INVOICE,
} from '../actions';

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
    case SUCCESS:
      return { ...state, success: action.payload };
    case ADD_INVOICE:
      return { ...state, success: action.payload };
    case ALL_INVOICE:
      return { ...state, invoices: action.payload };
    case INVOICE_IDX:
      return { ...state, invoiceIdx: action.payload };
    case CURRENT_INVOICE:
      return { ...state, currentInvoice: action.payload };
    default:
      return state;
  }
}
