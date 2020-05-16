import axios from 'axios';
import { FETCH_USER } from './types';


  //call a function that returns an async function with an argument for the
  //redux dispatch function that fetches the user info and dispatches to redux
  //state. res.data to get the response data object

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentuser');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch ({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  //provide access to the react router history object in order to redirect to
  //react router routes
  history.push('/surveys')
  dispatch ({ type: FETCH_USER, payload: res.data});
}
