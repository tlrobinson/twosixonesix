#!/usr/bin/env ./node_modules/.bin/babel-node

const React = require("react");
const { get, route, routes, listen, client, proxy } = require("..");

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

route("*", "/proxy(.*)", proxy("http://localhost:3000", { without: "/proxy" }));

// e.x. return a promise directly from a database query

// fake it so you don't need mongo installed
const Cat = {
  async find() {
    return [{ name: "garfield" }, { name: "quinnie" }];
  }
};
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/test");
// const Cat = mongoose.model("Cat", { name: String });

get("/promise+json", req => Cat.find());

get("/redirect", () => ({ status: 301, headers: { Location: "/html" } }));

// stream towel.blinkenlights.nl because why not
const net = require("net");

get("/async-iterator", () => blinkenlightsHTMLStream());

const blinkenlights = () =>
  net.createConnection({ host: "towel.blinkenlights.nl", port: 23 });

// async generator version:
async function* blinkenlightsHTMLStream() {
  for await (const chunk of blinkenlights()) {
    yield `<script>document.body.innerHTML = ""</script><pre>${chunk}</pre>`;
  }
}
// polyfill async iterator support into Streams for Node <10
const StreamToAsyncIterator = require("stream-to-async-iterator").default;
const { Readable } = require("stream");
if (!Readable.prototype[Symbol.asyncIterator]) {
  Readable.prototype[Symbol.asyncIterator] = function() {
    return new StreamToAsyncIterator(this);
  };
}

listen();
