const mongoose = require('mongoose')


// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url=process.env.MONGO_URI

console.log('connecting to',url)


mongoose.set('strictQuery',false)
mongoose.connect(url)
.then(()=>{
  const subjectSchema=new mongoose.Schema({
    name:String,
  })
  const Subject = mongoose.model('Subject', subjectSchema)

  const subject=new Subject({
    name:'',
  })
  Subject.find({}).then(result=>{
    result.forEach(subject=>{
      console.log(subject)
    })
    mongoose.connection.close()
  })
})

