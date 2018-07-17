const React = require("react");
const { get, routes } = require("../index");

get("/", () => (
  <ul>
    {routes.map(({ path }) => (
      <li>
        <a href={path}>{path}</a>
      </li>
    ))}
  </ul>
));

get("/html", () => "<strong>hello</strong> world");

get("/jsx", () => (
  <div>
    hello <strong>world</strong>
  </div>
));

get("/json", () => ({ hello: "world" }));

// e.x. return a promise directly from a database query
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
const Cat = mongoose.model("Cat", { name: String });

get("/promise+json", req => Cat.find());

// towel.blinkenlights.nl because why not
const net = require("net");
const StreamToAsyncIterator = require("stream-to-async-iterator").default;

get("/async-iterator", () => blinkenlightsHTMLStream());

async function* blinkenlightsHTMLStream() {
  const stream = net.createConnection({
    host: "towel.blinkenlights.nl",
    port: 23,
  });
  for await (const chunk of new StreamToAsyncIterator(stream)) {
    yield '<script>document.body.innerHTML = ""; document.body.style = "font-family: monospace; white-space: pre";</script>';
    yield chunk;
  }
}
