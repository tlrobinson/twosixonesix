const logger = app => async req => {
  const result = await app(req);
  console.log(req.url);
  return result;
};

module.exports = logger;
