const { Router } = require('express');
const { createUser, getAllUsers } = require('../controllers/users');
const exerciseRouter = require('./exercises');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);

usersRouter.use('/:id', exerciseRouter);

module.exports = usersRouter;
