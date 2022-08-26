const { Router } = require('express');
const { createExercise, getExerciseLog } = require('../controllers/exercises');
const { verifyDateRange, verifyDate, verifyUserExists } = require('../middlewares');

const exerciseRouter = Router({ mergeParams: true });

exerciseRouter.post('/exercises', verifyDate, verifyUserExists, createExercise);
exerciseRouter.get('/logs', verifyDateRange, getExerciseLog);

module.exports = exerciseRouter;
