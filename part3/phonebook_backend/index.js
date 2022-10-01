const { response } = require('express')
const express = require('express')

const app = express()
app.use(express.json())

const generateId = () => Math.trunc(Math.random() * 1000000000000)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('api/persons', (request, response) => {
  console.log("adasdadasdasd");
  const body = request.body

  /* if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } */

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)

})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter(p => p.id === id)
  if (person.length > 0) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const text = `Phonebook has info for ${persons.length} people` + "<br/>" + new Date()
  response.send(text)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)