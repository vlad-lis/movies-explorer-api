const { default: mongoose } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthError = require('../errors/AuthError');
const { unauthorizedErrMessage, invalidEmailErrMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => { validator.isEmail(email); },
      message: invalidEmailErrMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(unauthorizedErrMessage);
      }

      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new AuthError(unauthorizedErrMessage);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
