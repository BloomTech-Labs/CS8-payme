import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import {
} from '../actions';

const initialState = {
  
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: formReducer,
});

export default rootReducer;
