const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

let subjects= [
    {
      "name": "Англійська мова",
      "id": 1
    },
    {
      "name": "Математика",
      "id": 2
    },
    {
      "name": "Українська мова",
      "id": 3
    },
    {
      "name": "Німецька мова",
      "id": 4
    },
    {
      "name": "Історія України",
      "id": 5
    },
    {
      "name": "Хімія",
      "id": 6
    },
    {
      "name": "Біологія",
      "id":7
    },
    {
      "name": "Підготовка до школи",
      "id": 8
    },
    {
      "name": "Фізика",
      "id": 9
    }
  ]

  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(express.json())

  app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

 
  const generateId = () => {
    const maxId = subjects.length > 0
      ? Math.max(...subjects.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/subjects', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'subject missing' 
      })
    }
  
    const subject = {
      name: body.name,
      id: generateId(),
    }
  
    subjects = subjects.concat(subject)
  
    response.json(subject)
  })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/subjects', (request, response) => {
  response.json(subjects)
})

app.get('/api/subjects/:id', (request, response) => {
  const id = Number(request.params.id)
  const subject = subjects.find(subject => subject.id === id)
  if (subject) {
    response.json(subject)
  } else {
    console.log('x')
    response.status(404).end()
  }
})

app.delete('/api/subjects/:id', (request, response) => {
  const id = Number(request.params.id)
  subjects = subjects.filter(subject => subject.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})