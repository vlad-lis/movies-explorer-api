const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { unauthorizedErrMessage } = require('../utils/constants');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new AuthError(unauthorizedErrMessage);
    }

    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new AuthError(unauthorizedErrMessage));
  }

  req.user = payload;
  return next();
};
