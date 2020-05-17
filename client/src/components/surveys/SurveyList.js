import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  //helper function
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey lighten-5" key={survey._id}>
          <div className="card-content">
            <span
              className="card-title teal lighten-5"
              style={{
                marginTop: "-20px",
                marginBottom: '10px',
                marginLeft: "-22px",
                marginRight: "-22px",
                fontSize: "20px",
                shadow: "1px",
                border: "2px solid",
                borderColor: "gainsboro",
                borderRadius: "3px",
                fontFamily: "georgia, sans-serif"}}
            >
              <strong className="grey-text accent-2" style={{marginLeft: "10px", textShadow: "1px 1px lightsteelblue"}}>
                {survey.title}
              </strong>
            </span>
            <p className="blue-grey-text lighten-1">
              {survey.body}
            </p>
            <p className="blue-grey-text darken-4 right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <div className="blue-grey-text">
              Yes: <span className="green-text lighten-2">{survey.yes}</span>

              <span style={{marginLeft: "30px"}}>
                No: <span className="red-text lighten-2">{survey.no}</span>
              </span>

            </div>
          </div>
        </div>
      );
    });
  }

   render() {
     return (
      <div>
        {this.renderSurveys()}
      </div>
    );
   }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
