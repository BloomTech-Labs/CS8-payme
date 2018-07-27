import { SEND_SUCCESS, SEND_SMS, DELETED_SMS } from '../actions/smsReminders.js';

const initialState = {
  reminders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_SUCCESS:
      return { ...state, success: action.payload };

    default:
      return state;
  }
}
