const json = app => async req => {
  const res = await app(req);
  if (
    res.body === null ||
    (res.body &&
      !res.body[Symbol.asyncIterator] &&
      (typeof res.body === "object" || Array.isArray(res.body)))
  ) {
    return Object.assign({}, res, {
      body: JSON.stringify(res.body),
      headers: { "Content-Type": "application/json", ...(res.headers || {}) },
    });
  } else {
    return res;
  }
};

function isJSON(object) {}

module.exports = json;
