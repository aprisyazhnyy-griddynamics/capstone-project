const exerciseModel = require('../models/exersices');
const { formatDate } = require('../utils');

const createExercise = async (req, res) => {
  try {
    const today = new Date();

    const newExercise = new exerciseModel({
      ...req.body,
      date: req.body.date || formatDate(today),
      userId: req.params.id,
    });

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
