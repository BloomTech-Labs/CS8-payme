import {
  SUCCESS,
  ADD_INVOICE, ALL_INVOICE, INVOICE_IDX,
  CURRENT_INVOICE, ARRAY_MOVE, RESET_CURRINV,
} from '../actions/invoices';
import { USER_INVOICES } from '../actions/auth';

// const initialState = {
//   message: '',
//   success: '',
//   invoices: [],
//   invoiceIdx: 0,
//   currentInvoice: '',
// };

const initialState = {
  invoices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return { ...state, success: action.payload };
    case USER_INVOICES:
      return { ...state, invoices: action.payload };
    case ADD_INVOICE:
      return { ...state, success: action.payload };
    case ALL_INVOICE:
      return { ...state, invoices: action.payload };
    case INVOICE_IDX:
      return { ...state, invoiceIdx: action.payload };
    case CURRENT_INVOICE:
      return { ...state, currentInvoice: action.payload };
    case RESET_CURRINV:
      return { ...state, currentInvoice: action.payload };
    case ARRAY_MOVE:
      return { ...state, invoices: action.payload };
    default:
      return state;
  }
}
