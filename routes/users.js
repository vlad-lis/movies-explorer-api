const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserById, updateUserInfo, logout } = require('../controllers/users');

// get current user info
router.get('/me', getUserById);

// change user info
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

// sign out
router.post('/signout', logout);

module.exports = router;
