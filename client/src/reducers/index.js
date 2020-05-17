import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer.js';
import surveysReducer from './surveysReducer';

/*
  The object being passed to combineReducers should contain all of the details
  regarding our redux state, and are passed onto the state object.
*/
export default combineReducers({
  //asssociate the redux reducers to their corresponding state keys
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
