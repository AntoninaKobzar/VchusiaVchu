// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const config = require('./utils/config');
// const authRoutes = require('./routes/authRoutes');
// const subjectsRoutes=require('./routes/subjectsRoutes');
// const middleware = require('./utils/middleware');
// const logger = require('./utils/logger');
// const multer = require('multer');

// // Set up Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames for uploaded files
//   }
// });

// // Create Multer instance
// const upload = multer({ storage: storage });

// logger.info('Connecting to MongoDB...');
// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('Connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error('Error connecting to MongoDB:', error.message);
//   });

// app.use(cors());
// app.use(express.static('dist'));
// app.use(express.json());
// app.use(middleware.requestLogger);

// app.use('/api/auth', authRoutes);
// app.use('/api/subjects',subjectsRoutes)

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

// app.post('/api/upload', upload.single('photo'), (req, res) => {
//   // Access uploaded file through req.file
//   const photoUrl = '/uploads/' + req.file.filename; // Assuming uploads directory is accessible via public URL
//   // Save photoUrl to database
//   res.send('Photo uploaded successfully');
// });

// module.exports = app;


const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const authRoutes = require('./routes/authRoutes');
const subjectsRoutes = require('./routes/subjectsRoutes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames for uploaded files
  }
});

// Create Multer instance
const upload = multer({ storage: storage });

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
app.use('/api/subjects', subjectsRoutes);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Combine user registration with photo upload in a single endpoint
// app.post('/api/auth/register', upload.single('photo'), async (req, res) => {
//   try {
//     // Access form data and uploaded file through req.body and req.file
//     const userData = req.body;
//     const photoUrl = '/uploads/' + req.file.filename;

//     // Save user data and photoUrl to database (handle registration here)
//     // You can use userData and photoUrl to register the user with photo
//     // For example, you can create a new user in the database with the provided data

//     // Example: Create a new user using userData and save photoUrl to the database
//     const newUser = new User({
//       username: userData.username,
//       email: userData.email,
//       password: userData.password,
//       role: userData.role,
//       photo: photoUrl,
//       info: {
//         subjects: userData.info.subjects,
//         education: userData.info.education,
//         experience: userData.info.experience,
//         text: userData.info.text,
//         price: userData.info.price,
//         online: userData.info.online,
//         offline: userData.info.offline
//       }
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Send a success response
//     res.status(201).json({ message: 'User registered successfully with photo' });
//   } catch (error) {
//     // Handle any errors
//     console.error('Error registering user with photo:', error);
//     res.status(500).json({ error: 'An error occurred while registering user with photo' });
//   }
// });

module.exports = app;



