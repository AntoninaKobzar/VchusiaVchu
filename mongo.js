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
      photo: String,
      name: String,
      email: String,
      password: String,
      role: String,
    });

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
        offline: Boolean,
      },
    });

    const Subject = mongoose.model('Subject', subjectSchema);
    const Teacher = mongoose.model('Teacher', teacherSchema);
    const Student = mongoose.model('Student', studentSchema);

    // Sample data
    const subject = new Subject({ name: 'Math' });
    const student = new Student({
       name: 'John Doe',
        email: 'john@example.com',
         password: 'password123',
          role: 'student' 
        });
    const teacher = new Teacher({ 
      name: 'Jane Smith', 
      email: 'jane@example.com',
       password: 'password456', 
       role: 'teacher'
       });

    // Saving sample data
    return Promise.all([
      subject.save(),
      teacher.save(),
      student.save(),
    ]);
  })
  .then(() => {
    console.log('Data saved successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error:', error);
    mongoose.connection.close();
  });

