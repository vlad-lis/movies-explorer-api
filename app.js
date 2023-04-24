// import core dependencies and constants
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes/routes');
const {
  PORT, DB_URL, corsConfig, limiterConfig,
} = require('./config');

// import custom middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// app init
const app = express();
app.use(rateLimit(limiterConfig));
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

// mongodb
mongoose.connect(DB_URL, { useNewUrlParser: true });

// routes & loggers
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);

// errors
app.use(errors());
app.use(errorMiddleware);

// app launch
app.listen(PORT);
