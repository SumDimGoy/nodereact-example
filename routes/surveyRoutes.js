const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/email_templates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  //set wildcards to matching route params
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
      res.send("Thank you for your input.");
    }
  )

  //show the user surveys
  app.get('/api/surveys',
    requireLogin,
    async(req, res) => {
      const surveys = await Survey.find({ _user: req.user.id })
        .select({
          recipients: false
        });

      await res.send(surveys);
    });

  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      console.log(req.body);
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey ({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
        //mongoose auto generated id
        _user: req.user.id,
        dateSent: Date.now()
      });

      //send an email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      try{
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      }
      catch (err) {
        res.status(422).send(err);
      }
    }
  );

  //for sendgrid webhooks
  app.post(
    '/api/surveys/webhooks',
    (req, res) => {

      //path parser with matching route params
      const p = new Path('/api/surveys/:surveyId/:choice');

      //chain the events array in req.body
      const events = _.chain(req.body)

        //destructure assign the email and url 
        .map( ({ email, url }) => {

          //parse the webhook event url path for matches
          const match = p.test(new URL(url).pathname);

          //return the parsed path as an object if match found
          if (match) {
            return {
              email,
              surveyId: match.surveyId,
              choice: match.choice
            };
          }
        })

        //filter out undefined elements from the array
        .compact()

        //filter out all duplicate events matching email AND survey ID
        .uniqBy('email', 'surveyId')

        //query and update for each element in the array
        .each( ({surveyId, email, choice}) => {
          Survey.updateOne({
            _id: surveyId,
            recipients: {
                $elemMatch: { email: email, responded: false }
            }
          },
          //update argument
          {
            //mongo operator logic, inc = increment
            //key interpolation on choice to increment yes/no by one
            $inc: { [choice]: 1 },

            // set/update mongo operator
            //update the responded property on the recipient filtered by the
            //initial query above to true
            //$ = $elemMatch subdocument collection query
            $set: { 'recipients.$.responded': true },

            //update the response timestamp
            lastResponded: new Date()
          }).exec();
        })

        //return
        .value();

    //empty acknowledgment response
    res.send({});
  });
};
