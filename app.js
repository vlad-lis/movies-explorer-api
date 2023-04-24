const express = require('express');
const mongoose = require('mongoose');
const { PORT, DB_URL } = require('./config');

mongoose.connect(DB_URL, { useNewUrlParser: true });
const app = express();
app.listen(PORT);
