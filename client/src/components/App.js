import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.js'

import Landing from './Landing';

//const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

/*
  React Router notes

  BrowserRouter object manages the routes.  Route object creates a rule between a
  certain route and a set of components that will be visible on screen.

  How Route parsing works:
  If the user navigates to '/survey' React Router will find all matching routes
  to this string. This means that components at route '/' and '/survey' will
  both be displayed on screen without specifying otherwise. To modify this
  behavior, use the 'exact' property. If you add exact={true} (or just exact)
  then that content will ONLY be displayed if the user explicitly visits that
  URL
*/

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      //React will only allow one parent component
      //<div></div><div></div> would throw an error
      <div className="container">
        <BrowserRouter>
          {/* BrowserRouter only expects one component
            <div></div><div></div> would throw an error */}
          <div>
            <Header />

            {/* display the landing component */}
            <Route exact path="/" component={Landing} />

            {/*Dashboard after logging in*/}
            <Route exact path="/surveys" component={Dashboard} />

            {/* unique routes without matching substrings do not need the exact
              property */}
            <Route path="/surveys/new" component={SurveyNew} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//allows App to be imported
/*
  connect() redux, first arg is for mapping state to props function (uneeded for this component)
  second arg is the object of redux actions. All of these actions will be assigned to the component as props.
*/
export default connect(null, actions)(App);
