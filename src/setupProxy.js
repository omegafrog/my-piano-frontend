const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://" + process.env.REACT_APP_API_DOMAIN,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
      onProxyReq: function onProxyReq(proxyReq, req, res) {
        // Log outbound request to remote target
        console.log(
          "-->  ",
          req.method,
          req.path,
          "->",
          "headers:",
          req.headers,
          "proxyHeaders:",
          proxyReq.getHeaders(),
          "resHeaders:",
          res.getHeaders(),
          res.getHeaderNames()
        );
      },
      onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({ error: "Error when connecting to remote server." });
      },
      logLevel: "debug",
      secure: true,
    })
  );
};
