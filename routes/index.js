const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const NotFoundError = require('../errors/NotFound');
const { notFoundErrMessage } = require('../utils/constants');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/', authRoutes);
router.use(authMiddleware);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundErrMessage));
});

module.exports = router;
