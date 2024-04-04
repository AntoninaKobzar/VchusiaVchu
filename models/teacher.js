const mongoose=require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const teacherSchema = new mongoose.Schema({
    photo: String, 
    name: String,
    email: String,
    password: String,
    role: String,
    info: {
      subjects: [String], 
      education: String,
      experience: String,
      text: String, 
      price: String,
      online: Boolean,
      offline: Boolean
    }
  });

teacherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Teacher', teacherSchema)

