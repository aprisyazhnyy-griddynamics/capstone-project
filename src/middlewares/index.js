const { DATE_FORMAT } = require('../constants');
const userModel = require('../models/users');
const { formatDate } = require('../utils');

const verifyDate = (req, res, next) => {
  const isDateValid = !req.body.date || formatDate(new Date(req.body.date)) === req.body.date;

  if (!isDateValid) {
    res.status(400).json(`This date does not exist: ${req.body.date}`);
  } else {
    next();
  }
};

const verifyUserExists = async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user?._id) {
    res.status(400).json(`A user with id '${req.params.id}' does not exist`);
  } else {
    next();
  }
};

const verifyDateRange = (req, res, next) => {
  const { from, to } = req.query;

  const isFromValid = DATE_FORMAT.test(from);
  const isToValid = DATE_FORMAT.test(to);
  
  if (from && !isFromValid) {
    res.status(400).json(`'from' URL parameter's value '${from}' is invalid. Use YYYY-MM-DD format.`);
  } else if (to && !isToValid) {
    res.status(400).json(`'to' URL parameter's value '${to}' is invalid. Use YYYY-MM-DD format.`);
  } else {
    next();
  }
};

module.exports = {
  verifyDate,
  verifyUserExists,
  verifyDateRange,
};
