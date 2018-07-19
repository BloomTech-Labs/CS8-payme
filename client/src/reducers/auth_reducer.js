import { AUTHENTICATION_ERROR,
  ISAUTH, SET_ID, SUCCESS,
  ADD_INVOICE, ALL_INVOICE, INVOICE_IDX,
  CURRENT_INVOICE 
} from '../actions';

const initialState = {
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...state, message: action.payload };
    case ISAUTH:
      return { ...state, authenticated: true };
    case SET_ID:
      return { ...state, authenticated: true, user: action.payload };
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
