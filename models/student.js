const mongoose=require('mongoose')

  const studentSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    photo: String, 
    name: String,
    email: String,
    passwordHash: String,
    role: String,
  });

studentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Student=mongoose.model('Student', studentSchema)
module.exports = Student