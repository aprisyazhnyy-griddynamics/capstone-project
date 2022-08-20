const { Router } = require('express');
const { createExercise, getExerciseLog } = require('../controllers/exercises');

const exerciseRouter = Router({ mergeParams: true });

exerciseRouter.post('/exercises', createExercise);
exerciseRouter.get('/logs', getExerciseLog);

module.exports = exerciseRouter;
