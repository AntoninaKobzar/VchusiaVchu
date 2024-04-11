const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  photo: String,
  subjects: [String],
  education: String,
  experience: String,
  text: String,
  price: String,
  online: Boolean,
  offline: Boolean
});

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
