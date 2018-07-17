
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import {
  AUTHENTICATION_ERROR,
  ISAUTH,
  SET_ID,
} from '../actions';

const initialState = {
  message: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_ERROR:
      return { ...state, message: action.payload };
    case ISAUTH:
      return { ...state, authenticated: true };
    case SET_ID:
      return { ...state, authenticated: true, user: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: formReducer,
});

export default rootReducer;
