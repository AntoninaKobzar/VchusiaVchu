const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
// const User = require('../models/user')
const Student=require('../models/student')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const student = await Student.findOne({ username })
  const passwordCorrect = student === null
    ? false
    : await bcrypt.compare(password, student.passwordHash)

  if (!(student && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: student.username,
    id: student._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: student.username })
})

module.exports = loginRouter