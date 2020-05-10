import { combineReducers } from 'redux';
import authReducer from './authReducer.js';

/*
  The object being passed to combineReducers should contain all of the details
  regarding our state, and are passed onto the state object.
*/
export default combineReducers({
  //asssociates the 'auth' state to the authReducer
  auth: authReducer
});
