const url = require("url");

function router() {
  function handle(req) {
    const method = req.method.toUpperCase();
    const { pathname, query } = url.parse(req.url, true);
    req.query = query;
    // req = Object.assign(Object.create(req), { query });
    for (const route of self.routes) {
      if (
        route.path === pathname &&
        (route.method === "*" || route.method === method)
      ) {
        return route.handle(req);
      }
    }
    return { status: 404, body: "Not found" };
  }
  function use(...args) {
    self.middleware.push(...args);
  }
  function route(method, path, ...rest) {
    let handler = rest.pop();
    rest.unshift(...self.middleware);
    while (rest.length > 0) {
      handler = rest.pop()(handler);
    }
    self.routes.push({
      method: method.toUpperCase(),
      path: path,
      handle: handler,
    });
  }

  const self = handle;

  // state
  self.middleware = [];
  self.routes = [];

  // methods
  self.use = use;
  self.route = route;
  for (const method of ["get", "post", "put", "delete"]) {
    self[method] = route.bind(null, method);
  }
  self.del = self.delete;

  return self;
}

module.exports = router;
