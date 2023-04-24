// error status codes
const {
  BAD_REQUEST = 400, UNAUTHORIZED = 401, FORBIDDEN = 403,
  NOT_FOUND = 404, CONFLICT = 409, INTERNAL_SERVER_ERROR = 500,
} = process.env;

// error messages
const badRequestErrMessage = 'incorrect data sent';
const unauthorizedErrMessage = 'Unauthorized';
const forbiddenErrMessage = 'access forbidden';
const notFoundErrMessage = 'NotFound';
const conflictErrMessage = 'user already exists';
const internalErrMessage = '';
const invalidEmailErrMessage = 'incorrect email';

// login, logout success messages
const loginSuccessMessage = 'login successful';
const logoutSuccessMessage = 'logout successful';

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  badRequestErrMessage,
  unauthorizedErrMessage,
  forbiddenErrMessage,
  notFoundErrMessage,
  conflictErrMessage,
  internalErrMessage,
  invalidEmailErrMessage,
  loginSuccessMessage,
  logoutSuccessMessage,
};
