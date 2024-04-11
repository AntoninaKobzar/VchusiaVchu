const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Define storage for uploaded photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Unique filename
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role,subjects,education,
//       experience,
//       text,
//       price,
//       online,
//       offline,photo} = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Save user data to database, including photoUrl
//     const newUser = new User({
//       username,
//       email,
//       passwordHash,
//       role,
//       info: {
//         education,
//         experience,
//         text,
//         price,
//         online,
//         offline, // Copy other info fields from request body
//         subjects, // Save selected subjects to the info object
//       },
//       photo: req.file ? '/uploads/' + req.file.filename : '' // Store photo URL as string
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'An error occurred while registering user' });
//   }
// };
exports.register = async (req, res) => {
  try {
    const { username, email, password, role, subjects, education, experience, text, price, online, offline } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    let photoUrl = ''; // Initialize photoUrl

    if (req.file) {
      photoUrl = '/uploads/' + req.file.filename; // Construct photo URL if file is uploaded
    }

    // Save user data to database, including photoUrl
    const newUser = new User({
      username,
      email,
      passwordHash,
      role,
      photo: photoUrl,
      subjects,
      education,
      experience,
      text,
      price,
      online,
      offline,  
    });

    await newUser.save();
    console.log('User registered successfully:', newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.json( {token, user} );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// exports.login = async (req, res) => {
//   const { email, password} = req.body;

//   try {
//     const user = await User.findOne({ email });
//     console.log(user);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.passwordHash);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     // Generate JWT token
//     const token = jwt.sign({ email: user.email, role: user.role }, 'secret_key', { expiresIn: '1h' });

//     // Send token in response
//     res.json({ token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching user by ID' });
  }
};

exports.update = async (req, res) => {
  // Implement updating user logic here
};

exports.delete = async (req, res) => {
  // Implement deleting user logic here
};