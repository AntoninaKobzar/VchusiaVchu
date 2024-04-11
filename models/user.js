const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  photo: String,
  info: {
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Assuming Subject is another Mongoose model
    education: String,
    experience: String,
    text: String,
    price: String,
    online: Boolean,
    offline: Boolean
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
