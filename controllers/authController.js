const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role, info } = req.body;

    // Retrieve the filename and path of the uploaded file from req.file
    const photo = req.file ? req.file.path : '';

    const newUser = new User({
      username,
      email,
      password,
      role,
      photo,
      info
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully with photo' });
  } catch (error) {
    console.error('Error registering user with photo:', error);
    res.status(500).json({ error: 'An error occurred while registering user with photo' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, 'secret_key');
  res.json({ token });
};