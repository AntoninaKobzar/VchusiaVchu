const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register a new user
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role} = req.body;
//     if (!username || !email || !password || !role) {
//       return res.status(400).json({ error: 'Please fill out all required fields.' });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User with this email already exists.' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //Retrieve the filename and path of the uploaded file from req.file
//     // let photo = req.file ? req.file.path : '';
//     // let photo = '';
//     // if (req.file) {
//     //   photo = '/uploads/' + req.file.filename;
//     // }
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//       photo: req.file ? '/uploads/' + req.file.filename : ''
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully with photo' });
//   } catch (error) {
//     console.error('Error registering user with photo:', error);
//     res.status(500).json({ error: 'An error occurred while registering user with photo' });
//   }
// };

exports.register = async (username, email, password, role, photo) => { // Add 'photo' parameter
  try {
    const user = new User({ username, email, passwordHash: password, role, photo }); // Add 'photo' field
    await user.save();
    console.log(`User registered successfully with email: ${email}`);
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password} = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, 'secret_key', { expiresIn: '1h' });

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
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