const mongoose=require('mongoose')


  const teacherSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    photo: String, 
    email: {
      type:String,
      required:true,
      unique:true
    },
    passwordHash: String,
    role: String,
    info: {
      subjects: [String], 
      education: String,
      experience: String,
      text: String, 
      price: String,
      online: Boolean,
      offline: Boolean
    },
  });

teacherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Teacher=mongoose.model('Teacher', teacherSchema)

module.exports =Teacher 

