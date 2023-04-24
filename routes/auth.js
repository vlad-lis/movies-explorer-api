const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, logout } = require('../controllers/users');

// sign up
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().allow('').pattern(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
