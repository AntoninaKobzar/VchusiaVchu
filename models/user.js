const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  photo: { type: String, required: false, unique: false },
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
