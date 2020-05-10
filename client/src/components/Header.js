import React, { Component } from 'react';

//subclass React.Component
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left nodereact-example-logo">
           nodereact-example logo
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/auth/google">
                Sign In With Google
                <img src={process.env.PUBLIC_URL + "/google-logo.png"} width="30" height="30" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

//allow the Header component to be imported
export default Header;
