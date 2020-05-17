const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/email_templates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

  //set wildcards to matching route params
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
      res.send("Thank you for your input.");
    }
  )

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

  app.post(
    '/api/surveys/webhooks',
    (req, res) => {
      //console.log(req.body);
      const p = new Path('/api/surveys/:surveyId/:choice');

      const events = _.chain(req.body)

        //destructure assign the email and url from req.body
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

      //for every recipient record in a given survey
      //query and filter out all recipient records except those matching the
      //email and responded as false and update the record


    console.log('EVENTS!')
    console.log(events);
    res.send({});
  });
};
