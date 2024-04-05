const mongoose = require('mongoose')


const subjectSchema = new mongoose.Schema({
  name: String,
})

subjectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Subject', subjectSchema)