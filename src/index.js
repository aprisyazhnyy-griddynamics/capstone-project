const bodyParser = require('body-parser');
const colors = require('colors/safe');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');

require('dotenv').config();

const { API_PORT, API_ROOT } = require('./constants');
const MongoDB = require('./db');
const usersRouter = require('./routes/users');

const app = express();
const upload = multer();

app.use(cors());
app.use(upload.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

MongoDB.on('error', () => console.error('MongoDB connection error'));

// --- Serve UI ---
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// --- Serve API ---
app.use(`${API_ROOT}/users`, usersRouter);

app.listen(API_PORT, () => {
  console.log(`\n${colors.green('Server listening on port')} ${API_PORT}`);
});
