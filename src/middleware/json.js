const json = app => async req => {
  const res = await app(req);
  // TODO: cleanup/document this logic
  if (
    res.body === null ||
    (res.body &&
      !res.body[Symbol.asyncIterator] &&
      (typeof res.body === "object" || Array.isArray(res.body)))
  ) {
    return {
      status: res.status,
      headers: { "Content-Type": "application/json", ...(res.headers || {}) },
      body: JSON.stringify(res.body),
    };
  } else {
    return res;
  }
};

module.exports = json;
