const fs = require("fs");
const path = require("path");

const router = require("./src/middleware/router");
const server = require("./src/server");

for (const file of fs.readdirSync(path.join(__dirname, "src", "middleware"))) {
  const name = file.match(/^(.*)\.js$/)[1];
  exports[name] = require("./src/middleware/" + file);
}

const app = router();
app.use(exports.logger);
app.use(exports.json);
app.use(exports.jsx);
app.use(exports.body);
Object.assign(exports, app);
server(app);
