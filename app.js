const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const { PORT, DB_URL } = require('./config');

// import middlewares
const errorMiddleware = require('./middlewares/errorMiddleware');

// app init
const app = express();
app.use(express.json());

// mongodb
mongoose.connect(DB_URL, { useNewUrlParser: true });

// routes
app.use('/', router);

// errors
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
