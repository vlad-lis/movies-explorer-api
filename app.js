const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const { PORT, DB_URL } = require('./config');
const { INTERNAL_SERVER_ERROR, internalErrMessage } = require('./utils/constants');

// app init
const app = express();
app.use(express.json());

// mongodb
mongoose.connect(DB_URL, { useNewUrlParser: true });

// routes
app.use('/', router);

// errors
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? internalErrMessage
        : message,
    });
  next();
});

app.listen(PORT);
