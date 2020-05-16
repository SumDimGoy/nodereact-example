import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

//subclass React.Component
class Header extends Component {
  renderContent() {
    //console.log('this.props.auth data')
    //console.log (this.props.auth);
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">
              Login with Google
            </a>
          </li>);

      default:
        return [
          <li key='payments-li'><Payments /></li>,
          <li key='credits-li' style={{paddingLeft: "5px"}}>Credits:  {this.props.auth.credits}</li>,
          <li key='logout-li'><a href="/api/logout">Logout</a></li>];
  }
}

  render() {
    return (
      <nav>
        <div className="nav-wrapper">

          <Link
            style={{paddingLeft: "5px"}}
            to={this.props.auth ? '/surveys' : '/'}
            className="left nodereact-example-logo">
           nodereact-example logo
         </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//map state to props function
function mapStateToProps ({ auth }) {
  return { auth };
};

//allow the Header component to be imported
export default connect(mapStateToProps)(Header);
