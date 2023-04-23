require('dotenv').config();

const {
  NODE_ENV, PORT, MONGODB_URL, JWT_SECRET,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret_key',
  MONGODB_URL: NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://localhost:27017/moviesdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
};
