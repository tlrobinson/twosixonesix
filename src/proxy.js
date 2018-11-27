const client = require("./client");
const u = require("url");

function proxy(remoteUrl, { without } = {}) {
  let { host } = u.parse(remoteUrl);
  return async ({ method, url, headers, body }) => {
    if (host) {
      headers = { ...headers, host };
    }
    if (without && url.startsWith(without)) {
      url = url.slice(without.length);
    }
    return client({ method, url, headers, body });
  };
}

module.exports = proxy;
