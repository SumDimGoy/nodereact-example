const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  /*
  This proxy configuration assists the development environment in forwarding the
  original request from the port on which the create-react-app server runs, to
  the port on which the backend runs. This allows for cookies to be included in
  the request.
  */
  app.use(
    [
      "/api",
      "/auth/google",
      "/api/*"],
      createProxyMiddleware({
        target: 'http://localhost:5000', })
  );
};
