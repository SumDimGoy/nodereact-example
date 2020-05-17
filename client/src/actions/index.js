import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';


//call a function (action creator) that returns an async function with an
//argument for the redux dispatch function that then fetches the user info
//and dispatches response to redux state.

//res.data to get the response data object

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

  //provide access to the react-router history object to redirect to
  //routes handled by react-router
  history.push('/surveys')
  dispatch ({ type: FETCH_USER, payload: res.data});
}


export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}
