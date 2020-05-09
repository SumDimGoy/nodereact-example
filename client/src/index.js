import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

//this function renders JSX
/*
  Takes two arguments.
  First for the JSX to be rendered
  Second is the location in the DOM where to render the JSX
*/
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
