require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

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
    // response.json(persons)
    console.log("Getting Persons")
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const returnedPerson = persons.filter(person => person.id === id)
    // if (returnedPerson) {
    //     response.json(returnedPerson)
    // } else {
    //     response.status(404).end()
    // }
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
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

// const generateID = () => {
//     // const maxID = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
//     const maxID = Math.floor(Math.random() * 10000000)
//     return maxID + 1
// }

app.post('/api/persons', (request, response) => {
    console.log("Im here")
    const body = request.body

    console.log(body)

    if (!body.name || !body.number || body.content === undefined) {
        return response.status(400).json({
            error: 'Content Missing'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        // id: generateID(),
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    // persons = persons.concat(person)
    // console.log(person)
    // response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})