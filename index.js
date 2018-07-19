const fs = require("fs");
const path = require("path");

const server = require("./src/server");

const middleware = {};
for (const file of fs.readdirSync(path.join(__dirname, "src", "middleware"))) {
  const name = file.match(/^(.*)\.js$/)[1];
  middleware[name] = require("./src/middleware/" + file);
}

Object.assign(module.exports, middleware, { server });

// create a default instance for convienence
const app = middleware.router();
app.use(middleware.logger);
app.use(middleware.json);
app.use(middleware.jsx);
app.use(middleware.body);
Object.assign(app, server(app));
Object.assign(module.exports, app);
