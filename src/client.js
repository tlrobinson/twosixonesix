const fetch = require("isomorphic-fetch");
const u = require("url");

async function client({ method, url, headers, body }) {
  const parsed = u.parse(url);
  if (!parsed.protocol) {
    parsed.protocol = "http:";
  }
  if (!parsed.host) {
    parsed.host = headers.host;
  }
  url = u.format(parsed);

  if (body) {
    const buffers = [];
    for await (const buffer of body) {
      buffers.push(buffer);
    }
    body = Buffer.concat(buffers);
  }

  const response = await fetch(url, {
    method,
    headers,
    body
  });

  const responseHeaders = {};
  for (const [key, value] of Object.entries(response.headers._headers)) {
    // TODO: how to handle duplicate headers
    responseHeaders[key] = value[0];
  }
  delete responseHeaders["content-encoding"];

  return {
    status: response.status,
    headers: responseHeaders,
    body: response.body
  };
}

module.exports = client;
