const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const authRoutes = require('./routes/authRoutes');
const subjectsRoutes=require('./routes/subjectsRoutes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('Connecting to MongoDB...');
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api',subjectsRoutes)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;