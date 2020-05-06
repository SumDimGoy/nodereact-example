## Example Node/React Full-stack Web Application ##
This is a basic example of a Fullstack web application with Node, React, Redux,
and MongoDB based on a Udemy tutorial.

#### Requirements ####
* NPM (Node Package Manager)
* MongoDB
* [Google OAuth 2.0 Keys](https://support.google.com/cloud/answer/6158849?hl=en)
* A hash for a cookie key

#### What is this repository for? ####

* A full-stack web application that allows a user to sign up, purchase credits, and then customize an email campaign for a list of email addresses.

* Version 0.1

#### How do I get set up? ####

* Clone the repo \
`git clone https://github.com/SumDimGoy/nodereact-example.git`

* Install dependencies \
`npm install`

* [Add Authorized JavaScript Origins and Redirect URIs for Google OAuth](https://developers.google.com/identity/sign-in/web/server-side-flow) \
Javascript Origin: `<http|https>://<ipaddress:port or deployment url>` \
Redirect URI: `<http|https>://<ipaddress:port or deployment url>/auth/google/callback`

* [Create MongoDB Cluster and Database](https://docs.atlas.mongodb.com/getting-started/) \
For local Deployment, whitelist your own IP address. For Heroku/production deployment use `0.0.0.0/0`


#### Local Deployment ####
* Create config/dev.js:
  ```javascript
  module.exports = {
    googleClientID: '<Google OAuth Client ID>',
    googleClientSecret: '<Google OAuth Client Secret>',
    mongoURI: '<MongoDB Connection String>',
    cookieKey : '<Hash/Cookie Key>'
  }
  ```


* To start the server: \
`npm run dev`

#### Heroku Deployment #####
* [Login to Heroku and set environment variables:](https://devcenter.heroku.com/articles/config-vars)
  ```
  GOOGLE_CLIENT_ID = <Google OAuth Client ID>
  GOOGLE_CLIENT_SECRET = <Google OAuth Client Secret>
  MONGO_URI = <MongoDB Connection String>
  COOKIE_KEY = <Hash/Cookie Key>
  ```


 * [Deploying NodeJS on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)



Verify that your application is running by navigating to the application's url in the browser.
