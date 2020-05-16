import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields() {
    /*
      redux-form Field passes on the label property to the surveyField component
    */
    return _.map(formFields, ({ label, name }) =>  {
      //iterate over our list of fields (destructuring) and create a Field Component
      return (
        <Field
          label={label}
          type="text"
          name={name}
          component={ SurveyField }
          key= { name+'-field' }
          />
        );
    });
  }

  render() {
    return (
      <div>
        <br /><br />
        <form onSubmit = {
          //this.props.handleSubmit(values => console.log(values))
          //give the onSurveySubmit function from NewSurvey to the submit handle
          this.props.handleSubmit(this.props.onSurveySubmit)
        }>
          { this.renderFields() }

          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  /*
    in the validate function for redux, it will match up to any values
    assigned in the error object that also exist as a prop in the SurveyForm
    and render that error messagem in the component
  */
  const errors = {};

  //check for invalid emails or empty string and return
  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a ' +
        ((name === 'emails') ? 'recipient' : name);
    }
  });

  return errors;
}

//destroyOnUnmount deletes data from form by default
//set to false to preserve in redux.
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
