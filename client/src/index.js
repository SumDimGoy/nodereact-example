import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

//give the reducers to the redux store with reduxThunk middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//this function renders JSX
/*
  Takes two arguments.
  First for the JSX to be rendered
  Second is the location in the DOM to render the JSX
*/

/*
  Redux Notes:
  From the React Components we call an Action Creator, which will return an
  Action that wil be sent to all of the different reducers, which will then
  update all of the state in the Redux Store. This updated state get sent to
  the React Components, causeing the components to re-render.

  In-Depth:
  Inside of the index.js file, we will create a Redux Store, and also render a
  P rovider tag which is provfided by the react-redux library. The react-redux
  library ensures that react and redux will work together. The redux store will
  be passed to the Provider, and because the Provider tag is at the parent
  component of the application, any other component that is created can access
  the redux store and gather state.

*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('React Stripe Key: '+ process.env.REACT_APP_STRIPE_KEY)
