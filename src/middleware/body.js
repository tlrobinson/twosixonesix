const body = app => async req => {
  const res = await app(req);
  if (res && typeof res === "object" && res.status != null) {
    return res;
  }
  return { status: 200, headers: {}, body: res };
};

module.exports = body;
