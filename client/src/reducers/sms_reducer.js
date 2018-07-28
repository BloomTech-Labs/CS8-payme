import { ADD_REMINDER, SEND_SMS, DELETED_SMS } from '../actions/smsReminders.js';

const initialState = {
  reminders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REMINDER:
      return { ...state, reminders: action.payload };

    default:
      return state;
  }
}
