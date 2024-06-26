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
const Subject=mongoose.model('Subject',subjectSchema)

module.exports = Subject