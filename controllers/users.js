const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');
const NotFoundError = require('../errors/NotFound');
const {
  badRequestErrMessage, conflictErrMessage, notFoundErrMessage,
  loginSuccessMessage, logoutSuccessMessage,
} = require('../utils/constants');
const { JWT_SECRET } = require('../config');

// create user
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User
      .create({
        email, password: hash, name,
      }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictErrMessage));
      } else {
        next(err);
      }
    });
};

// find user by id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('NotFound');
    })
    .then((user) => res.send(user))
    .catch(next);
};

// update user info
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(notFoundErrMessage);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrMessage));
      } else {
        next(err);
      }
    });
};

// login
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: loginSuccessMessage })
        .end();
    })
    .catch(next);
};

// logout
module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
      .send({ message: logoutSuccessMessage })
      .end();
  } catch (err) {
    next(err);
  }
};
