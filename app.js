
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const authRoutes = require('./routes/authRoutes');
const subjectsRoutes = require('./routes/subjectsRoutes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
// const multer = require('multer');
// const path = require('path');





// const PORT = config.PORT;

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
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(express.json());
app.use(middleware.requestLogger);

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// POST endpoint for uploading photos
app.post('/api/auth/register/upload-photo', upload.single('photo'), (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // If file is uploaded, return the URL to access the file
    const photoUrl = `http://localhost:${config.PORT}/${req.file.path}`;
    res.json({ photoUrl });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectsRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;



