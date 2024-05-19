const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/fill",
    createProxyMiddleware({
      target: "http://localhost:5000/fill",
      changeOrigin: true,
    })
  );
};
