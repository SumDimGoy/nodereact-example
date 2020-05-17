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
            <a className="oauth-container btn darken-4 white black-text" href="/auth/google" style={{textTransform: "none"}}>
                <div className="left">
                    <img
                      width="20px"
                      style={{
                        marginTop: "7px",
                        marginRight: "8px"
                      }}
                      alt="Google sign-in"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    />

                </div>
                <span style={{fontSize: "18px"}}>Login with Google</span>
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
            <img
              src={process.env.PUBLIC_URL+'/React.png'}
              width="34"
              height="30"
            />
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
