const express = require('express')
const app = express()
require('dotenv').config()

const Subject=require('./models/subject')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/subjects', (request, response) => {
  Subject.find({}).then(subjects=>{
    response.json(subjects)
  })
})

app.post('/api/subjects', (request, response) => {
  const body = request.body

  if (body.name===undefined) {
    return response.status(400).json({ 
      error: 'subject missing' 
    })
  }

  const subject = new Subject({
    name:body.name,
  })
subject.save().then(savedSubject=>{
  response.json(savedSubject)
})
})


let subjects= [
    {
      "name": "Англійська мова",
      "id": "1"
    },
    {
      "name": "Математика",
      "id": "2"
    },
    {
      "name": "Українська мова",
      "id": "3"
    },
    {
      "name": "Німецька мова",
      "id": "4"
    },
    {
      "name": "Історія України",
      "id": "5"
    },
    {
      "name": "Хімія",
      "id": "6"
    },
    {
      "name": "Біологія",
      "id":"7"
    },
    {
      "name": "Підготовка до школи",
      "id": "8"
    },
    {
      "name": "Фізика",
      "id": "9"
    }
  ]

  app.get('/api/subjects/:id', (request, response,next) => {
    Subject.findById(request.params.id)
    .then(subject=>{
      if(subject){
      response.json(subject)
    } else {
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
  })
  
  app.delete('/api/subjects/:id', (request, response,next) => {
    Subject.findByIdAndDelete(request.params.id)
    .then(result=>{
      response.status(204).end()
    })
    .catch(error=>next(error))
  })

  //update
  
  // app.put('/api/notes/:id', (request, response, next) => {
  //   const body = request.body
  
  //   const note = {
  //     content: body.content,
  //     important: body.important,
  //   }
  
  //   Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //     .then(updatedNote => {
  //       response.json(updatedNote)
  //     })
  //     .catch(error => next(error))
  // })
  
app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})