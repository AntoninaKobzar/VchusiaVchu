const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;


console.log('connecting to', url);

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    const subjectSchema = new mongoose.Schema({
      name: String,
    });

    const studentSchema = new mongoose.Schema({
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
    });

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
        offline: Boolean,
      },
    });
    // const userSchema = mongoose.Schema({
    //   username: {
    //     type: String,
    //     required: true,
    //     unique: true
    //   },
    //   passwordHash: String,
    //  role:String,
    // })

    const Subject = mongoose.model('Subject', subjectSchema);
    const Teacher = mongoose.model('Teacher', teacherSchema);
    const Student = mongoose.model('Student', studentSchema);
    // const User=mongoose.model('User',userSchema)

  Subject.find({}).then(result => {
    result.forEach(subject => {
      console.log(subject)
    })
    mongoose.connection.close()
  })
  Student.find({}).then(result => {
    result.forEach(student => {
      console.log(student)
    })
    mongoose.connection.close()
  })
  
  Teacher.find({}).then(result => {
    result.forEach(teacher => {
      console.log(teacher)
    })
    mongoose.connection.close()
  })
  // User.find({}).then(result => {
  //   result.forEach(user => {
  //     console.log(user)
  //   })
  //   mongoose.connection.close()
  // })
})

