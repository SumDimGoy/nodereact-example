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

  app.get('/api/surveys/feedback', (req, res) => {
      res.send("Thank you for your input.");
  }
)

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
      const events = _.map(req.body, ({ email, url }) => {

        const pathName = new URL(url).pathname
        const p = new Path('/api/surveys/:surveyId/:choice');
        const match = p.test(pathName);

        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
    });
    console.log('EVENTS!')
    console.log(events);
  });
};
