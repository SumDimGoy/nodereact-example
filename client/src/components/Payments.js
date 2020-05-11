import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';



class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={500}
        description="$5 for 5 credits"
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add credits
        </button>
      </StripeCheckout>
    );
  };
}

//pass actions to use this.props.handleToken
export default connect(null, actions)(Payments);
