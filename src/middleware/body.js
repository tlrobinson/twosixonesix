const body = app => async req => {
  const res = await app(req);
  if (!res || typeof res !== "object" || res.body === undefined) {
    return { body: res };
  }
  return res;
};

module.exports = body;
