import { FETCH_SURVEYS } from '../actions/types';

//initial state of survey list (state) is empty
export default function (state = [], action) {
  switch(action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
}
