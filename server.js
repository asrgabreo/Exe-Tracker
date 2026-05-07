const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();

require('dotenv').config();

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.ATLAS_URI;

if (!mongoUri) {
  console.error('Missing ATLAS_URI environment variable.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  }))
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });
