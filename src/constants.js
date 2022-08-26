const API_PORT = process.env.PORT || 3000;
const API_ROOT = '/api';
const DB_ERROR_CODES = {
  RECORD_EXISTS: 11000
};

const DATE_FORMAT = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

module.exports = {
  API_PORT,
  API_ROOT,
  DATE_FORMAT,
  DB_ERROR_CODES,
};
