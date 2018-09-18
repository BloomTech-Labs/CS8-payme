import {
  ADD_REMINDER, ONE_REMINDER, DELETED_SMS, ALL_REMINDERS,
} from '../actions/smsReminders.js';

import { INVOICE_REMINDERS } from '../actions/auth';

const initialState = {
  reminders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_REMINDERS:
      return { ...state, areminders: action.payload };
    case INVOICE_REMINDERS:
      return { ...state, reminders: action.payload };
    case ADD_REMINDER:
      return { ...state, reminders: action.payload };
    case ONE_REMINDER:
      return { ...state, reminder: action.payload };
    case DELETED_SMS: {
      const newlist = state.areminders.filter(rem => rem._id !== action.payload._id);
      return { ...state, areminders: newlist };
    }
    default:
      return state;
  }
}
