const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true 
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      passwordHash: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
      }
    });
    const subjectSchema = new mongoose.Schema({
      name: String,
    });
    // Hash password before saving
    userSchema.pre('save', async function(next) {
      const user = this;
      if (!user.isModified('passwordHash')) return next();

      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
      next();
    });
    subjectSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    });
    const User = mongoose.model('User', userSchema);

    // Example of registering a new user (student or teacher)
    const registerUser = async (username,email, password, role) => {
      try {
        const user = new User({ username,email, passwordHash: password, role });
        await user.save();
        console.log(`User registered successfully with email: ${email}`);
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    };

    // Example of logging in
    const loginUser = async (email, password) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.error('User not found');
          return;
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
          console.error('Incorrect password');
          return;
        }

        console.log('Login successful');
        // Generate JWT token or perform other authentication tasks
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    };

    // Example usage:
    registerUser('student@example.com', 'studentpassword', 'student');
    registerUser('teacher@example.com', 'teacherpassword', 'teacher');

    loginUser('student@example.com', 'studentpassword');
    loginUser('teacher@example.com', 'teacherpassword');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  module.exports = mongoose.model('Subject', subjectSchema);