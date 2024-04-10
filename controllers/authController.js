const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role} = req.body;

    // Retrieve the filename and path of the uploaded file from req.file
    // let photo = req.file ? req.file.path : '';
    let photo = '';
    if (req.file) {
      photo = '/uploads/' + req.file.filename;
    }
    const newUser = new User({
      username,
      email,
      password,
      role,
      photo
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