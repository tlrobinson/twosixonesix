const React = require("react");
const { isElement } = require("react-dom/test-utils");
const { renderToString } = require("react-dom/server");

const jsx = app => async req => {
  const res = await app(req);
  if (isElement(res.body)) {
    return Object.assign({}, res, {
      body: renderToString(res.body),
      headers: { "Content-Type": "text/html", ...(res.headers || {}) },
    });
  } else {
    return res;
  }
};

module.exports = jsx;
