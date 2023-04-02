const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  const target = "http://localhost:5000";

  app.use(
    ["/api", "/user", "/auth"],
    proxy({
      target,
      changeOrigin: true,
    })
  );
};
