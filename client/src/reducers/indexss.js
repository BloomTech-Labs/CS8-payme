import { combineReducers } from 'redux';
import { AuthReducer } from './auth_reducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: formReducer,
});


export default rootReducer;