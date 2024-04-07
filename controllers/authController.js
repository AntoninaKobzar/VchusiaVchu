const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register a new user

exports.registerUserWithPhoto = async (req, res) => {
  try {
    // Access form data and uploaded file through req.body and req.file
    const userData = req.body;
   
    const photoUrl = '/uploads/' + req.file.filename;

    // Save user data and photoUrl to database (handle registration here)
    // You can use userData and photoUrl to register the user with photo
    // For example, you can create a new user in the database with the provided data

    // Example: Create a new user using userData and save photoUrl to the database
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      photo: photoUrl,
      info: {
        subjects: userData.info.subjects,
        education: userData.info.education,
        experience: userData.info.experience,
        text: userData.info.text,
        price: userData.info.price,
        online: userData.info.online,
        offline: userData.info.offline
      }
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully with photo' });
  } catch (error) {
    // Handle any errors
    console.error('Error registering user with photo:', error);
    res.status(500).json({ error: 'An error occurred while registering user with photo' });
  }
};
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const user = new User({ username, email, password, role });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email, role: user.role }, 'secret_key');
  res.json({ token });
};
