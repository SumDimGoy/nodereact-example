import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
  console.log('action', action);
  switch (action.type) {
    //fetch and return user object else return false
    case FETCH_USER:
      return action.payload || false; //return the action payload

    //fallback state
    default:
      return state;
  }
}
