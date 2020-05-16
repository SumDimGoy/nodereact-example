import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

  //replaces props.state
  state = { showFormReview: false };

  //helper function for form review canceling
  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />;
    }

    return <SurveyForm
      onSurveySubmit={ () => this.setState({
        showFormReview: true })
    }/>;
  }

  render () {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
