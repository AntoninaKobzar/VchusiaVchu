const bcrypt = require('bcrypt')
const teachersRouter = require('express').Router()
const Teacher = require('../models/teacher')

teachersRouter.post('/', async (request, response) => {
  const { username,name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const teacher = new Teacher({
    username,
    name,
    passwordHash,
  })

  const savedTeacher = await teacher.save()

  response.status(201).json(savedTeacher)
})

teachersRouter.get('/', async (request, response) => {
  const teachers = await Teacher.find({})
  response.json(teachers)
})

module.exports = teachersRouter