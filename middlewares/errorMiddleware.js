const { INTERNAL_SERVER_ERROR, internalErrMessage } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? internalErrMessage
        : message,
    });
  next();
};
