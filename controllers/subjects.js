
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