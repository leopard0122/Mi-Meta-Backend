require("dotenv").config();


const crypto = require('crypto');
const secret_key  =  crypto.randomBytes(32).toString('hex');

module.exports = {
  IS_PROD: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_CLUSTER: process.env.DB_CLUSTER,
  SESS_SECRET: process.env.SESS_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  Security_key :secret_key,
  UPLOAD_URL : "./public/uploads",
};