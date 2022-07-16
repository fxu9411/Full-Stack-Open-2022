const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const returnedPerson = persons.filter(person => person.id === id)
    if (returnedPerson) {
        response.json(returnedPerson)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const body = `<p>Phonebook has info for ${persons.length} people</p>${new Date()}`
    response.send(body)
})

const generateID = () => {
    // const maxID = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    const maxID = Math.floor(Math.random() * 10000000)
    return maxID + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Content Missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(persons)
})

const PORT = 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})