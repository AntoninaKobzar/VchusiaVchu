
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// const path = require('path');

const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const authRoutes = require('./routes/authRoutes');
const subjectsRoutes = require('./routes/subjectsRoutes');
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

  const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(middleware.requestLogger);


app.use(upload.single('photo'));



mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });


app.use('/api/users', authRoutes);
app.use('/api/subjects', subjectsRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;



