function express(middleware) {
  return app => (req, res) =>
    new Promise((resolve, reject) => {
      // HACK: use a mock response?
      const res = req.socket._httpMessage;
      const next = async () => {
        try {
          resolve(await app(req));
        } catch (e) {
          reject(e);
        }
      };
      middleware(req, res, next);
    });
}

module.exports = express;
