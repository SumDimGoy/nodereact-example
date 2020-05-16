//show review of form data before submit
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  //console.log(formValues);

  //map the review fields
  const reviewFields =  formFields.map(({label, name}) => {
    return (
      <div key={name+'-fieldreview'}>
        <label>{ label }: </label>
        <div>{ formValues[name] }</div>
      </div>
    );
  });;

  return (
    <div>
      <h5>Please review your entries.</h5>
      <div>
        {reviewFields}
      </div>
      <br/><br/>
      <button
        className="yellow darken-3 btn-flat"
        onClick={ onCancel }>
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={ () => submitSurvey(formValues, history) }>
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}


function mapStateToProps(state) {
  //take redux state and transform to props to send to the component

  //when defining mapStateToProps,
  //the return object will show up as props to the component we connect to
  return { formValues: state.form.surveyForm.values };
}

//wire mapStateToProps function to the connection to the redux store.
//withRouter to pass on the react router context
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
