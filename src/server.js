const http = require("http");

const DEFAULT_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
};

const DEFAULT_HEADERS_CHUNKED = {
  "Transfer-Encoding": "chunked",
};

function server(app) {
  const handler = async (request, response) => {
    try {
      const result = await app(request);
      // STATUS
      const status = result.status || 200;
      // HEADERS
      const headers = Object.assign({}, DEFAULT_HEADERS);
      if (result.body && result.body[Symbol.asyncIterator]) {
        Object.assign(headers, DEFAULT_HEADERS_CHUNKED);
      }
      if (result.headers) {
        Object.assign(headers, result.headers);
      }
      // BODY
      const body = result.body;

      response.writeHead(status, headers);
      if (body) {
        for await (const chunk of body) {
          response.write(chunk);
        }
      }
      response.end();
    } catch (error) {
      console.warn(error);
      response.writeHead(500);
      response.end();
    }
  };

  const listen = ({ port = 3000 } = {}) => {
    const server = http.createServer(handler);
    return new Promise((resolve, reject) => {
      server.listen(port, err => {
        if (err) {
          console.log(`Error starting server`, err);
          reject(err);
        } else {
          console.log(`Listening on ${port}`);
          resolve();
        }
      });
    });
  };

  return { app, handler, listen };
}

module.exports = server;
