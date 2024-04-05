const subjectsRouter = require('express').Router()
const Subject = require('../models/subject')

subjectsRouter.get('/', async (request, response) => {
  const subjects = await Subject.find({})
  response.json(subjects)
})

subjectsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const subject = {
    name: body.name,
  }

  const updatedSubject = await Subject.findByIdAndUpdate(request.params.id, subject, { new: true })
  response.json(updatedSubject)
})

subjectsRouter.post('/', async (request, response) => {
  const body = request.body

  const subject = new Subject({
    name: body.name,
  })

  const savedSubject = await subject.save()
  response.status(201).json(savedSubject)
})

subjectsRouter.get('/:id', async (request, response) => {
  const subject = await Subject.findById(request.params.id)
  if (subject) {
    response.json(subject)
  } else {
    response.status(404).end()
  }
})

subjectsRouter.delete('/:id', async (request, response) => {
  await Subject.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = subjectsRouter