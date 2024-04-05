const bcrypt = require('bcrypt')
const studentsRouter = require('express').Router()
const Student = require('../models/student')

studentsRouter.post('/', async (request, response) => {
  const { username,name, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const student = new Student({
    username,
    name,
    passwordHash,
  })

  const savedStudent = await student.save()

  response.status(201).json(savedStudent)
})

studentsRouter.get('/', async (request, response) => {
  const students = await Student.find({})
  response.json(students)
})

module.exports = studentsRouter