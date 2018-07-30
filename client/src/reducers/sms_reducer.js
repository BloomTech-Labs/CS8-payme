import { ADD_REMINDER, ONE_REMINDER, DELETED_SMS } from '../actions/smsReminders.js';

const initialState = {
  reminders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REMINDER:
      return { ...state, reminders: action.payload };
    case ONE_REMINDER:
      return { ...state, reminder: action.payload };
    default:
      return state;
  }
}
