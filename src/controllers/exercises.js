const { DATE_FORMAT } = require('../constants');
const exerciseModel = require('../models/exersices');
const userModel = require('../models/users');
const { formatDate } = require('../utils');

const createExercise = async (req, res) => {
  try {
    const today = new Date();
    const isDateValid = req.body.date && formatDate(new Date(req.body.date)) === req.body.date;

    if (!req.body.date) {
      res.status(400).json(`No date provided`);
    } else if (!isDateValid) {
      res.status(400).json(`This date does not exist: ${req.body.date}`);
    } else {
      const newExercise = new exerciseModel({
        ...req.body,
        date: req.body.date || formatDate(today),
        userId: req.params.id,
      });
  
      const user = await userModel.findById(req.params.id);

      if (!user?._id) {
        res.status(400).json(`A user with id '${req.params.id}' does not exist`);
      } else {
        const savedExercise = await newExercise.save();
        
        res.status(200).json(savedExercise);
      }
    }
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
    const isFromValid = DATE_FORMAT.test(from);
    const isToValid = DATE_FORMAT.test(to);
    
    if (from && !isFromValid) {
      res.status(400).json(`'from' URL parameter's value '${from}' is invalid. Use YYYY-MM-DD format.`);
    } else if (to && !isToValid) {
      res.status(400).json(`'to' URL parameter's value '${to}' is invalid. Use YYYY-MM-DD format.`);
    } else {
      const count = await exerciseModel
        .find({ userId: req.params.id })
        .count();

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
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createExercise, getExerciseLog };
