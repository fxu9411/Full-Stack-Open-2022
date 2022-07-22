require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')


app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    // response.json(persons)
    console.log("Getting Persons")
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
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

app.post('/api/persons', (request, response) => {
    // console.log("Im here")
    const body = request.body

    const persons = []

    Person.find({}).then(person => {
        persons.concat(person)
    })

    // console.log(persons)
    // console.log(body)

    if (!body.name || !body.number) {
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
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})