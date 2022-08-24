const { DATE_FORMAT } = require('../constants');
const exerciseModel = require('../models/exersices');
const userModel = require('../models/users');
const { formatDate } = require('../utils');

const createExercise = async (req, res) => {
  const today = new Date();
  const isDateValid = formatDate(new Date(req.body.date)) === req.body.date;

  try {
    if (!isDateValid) res.status(400).json(`This date does not exist: ${req.body.date}`);

    const newExercise = new exerciseModel({
      ...req.body,
      date: req.body.date || formatDate(today),
      userId: req.params.id,
    });

    const user = await userModel.findById(req.params.id);
    if (!user?._id) res.status(400).json(`A user with id '${req.params.id}' does not exist`);

    const savedExercise = await newExercise.save();
    
    res.status(200).json(savedExercise);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  }
};

const getExerciseLog = async (req, res) => {
  const { from, to, limit } = req.query;

  try {
    const count = await exerciseModel
      .find({ userId: req.params.id })
      .count();
    
    const isFromValid = DATE_FORMAT.test(from);
    if (from && !isFromValid) res.status(400).json(`'from' URL parameter's value '${from}' is invalid. Use YYYY-MM-DD format.`);
    
    const isToValid = DATE_FORMAT.test(to);
    if (to && !isToValid) res.status(400).json(`'to' URL parameter's value '${to}' is invalid. Use YYYY-MM-DD format.`);

    const logs = await exerciseModel
      .find({
        userId: req.params.id,
        ...(from || to
          ? {
            date: {
              ...(from ? { $gte: from } : {}),
              ...(to ? { $lte: to } : {}),
            }
          }
          : {}
        ),
      })
      .sort('date')
      .limit(limit);
    
    
    res.status(200).json({ count, logs });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createExercise, getExerciseLog };
