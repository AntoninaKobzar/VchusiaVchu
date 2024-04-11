// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // Define the user schema
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String
//   },
//   email: { type: String, required: true, unique: true },
//   passwordHash: { type: String, required: true },
//   role: { type: String, enum: ['student', 'teacher'], required: true },
//   photo: { type: String},
//   info: {
//     subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
//     education: String,
//     experience: String,
//     text: String,
//     price: String,
//     online: Boolean,
//     offline: Boolean
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   const user = this;
//   if (!user.isModified('passwordHash')) return next();

//   const saltRounds = 10;
//   user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
//   next();
// });

// // Create the User model
// const User = mongoose.model('User', userSchema);

// // Example function to register a new user
// const registerUser = async (username, email, password, role) => {
//   try {
//     const user = new User({ username, email, passwordHash: password, role });
//     await user.save();
//     console.log(`User registered successfully with email: ${email}`);
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//   }
// };

// // Example function to log in a user
// const loginUser = async (email, password) => {
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.error('User not found');
//       return;
//     }

//     const passwordMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!passwordMatch) {
//       console.error('Incorrect password');
//       return;
//     }

//     console.log('Login successful');
//     // Generate JWT token or perform other authentication tasks
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//   }
// };

// module.exports = {
//   User,
//   registerUser,
//   loginUser
// };
