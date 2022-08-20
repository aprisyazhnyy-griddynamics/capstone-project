const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        message: 'Wrong date format. Use YYYY-MM-DD format.',
        validator: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      },
    },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

const exerciseModel = mongoose.model('Exercise', ExerciseSchema);

module.exports = exerciseModel;
