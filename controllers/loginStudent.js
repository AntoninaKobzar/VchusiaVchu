// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const loginRouter = require('express').Router()
// const Student = require('../models/student')

// loginRouter.post('/', async (request, response) => {
//   const { username, password } = request.body

//   const user = await Student.findOne({ username })
//   const passwordCorrect = user === null
//     ? false
//     : bcrypt.compare(password,user.passwordHash)

//   if (!(user && passwordCorrect)) {
//     return response.status(401).json({
//       error: 'invalid name or password'
//     })
//   }

//   const userForToken = {
//     username: user.username,
//     id: user._id
//   }

//   const token = jwt.sign(userForToken, process.env.SECRET)

//   response
//     .status(200)
//     .send({ token, username: user.username })
// })

// module.exports = loginRouter