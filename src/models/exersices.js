const mongoose = require('mongoose');
const { DATE_FORMAT } = require('../constants');

const ExerciseSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        message: 'Wrong date format. Use YYYY-MM-DD format.',
        validator: DATE_FORMAT,
      },
    },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: String, required: true },
  },
);

const exerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports = exerciseModel;
