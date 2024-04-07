
const Subject = require('../models/subject');

exports.get = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await Subject.findOne({ name });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the subject already exists
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    // Generate a unique ID for the new subject
    const id = generateUniqueId(); // You need to implement generateUniqueId function

    // Create a new subject object
    const newSubject = new Subject({ name, id });

    // Save the subject to the database
    await newSubject.save();

    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function generateUniqueId() {
  const timestamp = new Date().getTime(); 
  const random = Math.floor(Math.random() * 1000000);
  return timestamp.toString(36) + random.toString(36);
}

exports.getAll = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};