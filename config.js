require('dotenv').config();

const {
  NODE_ENV, PORT, DB_URL, JWT_SECRET,
} = process.env;

const corsConfig = {
  credentials: true,
  origin: true,
};

const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret_key',
  DB_URL: NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
  corsConfig,
  limiterConfig,
};
