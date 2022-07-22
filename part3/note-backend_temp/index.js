require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    // const id = Number(request.params.id)
    // const note = notes.find(note => note.id === id)
    // console.log(`Getting note object with ID ${id}`)
    // if (note) {
    //     response.json(note)
    // } else {
    //     response.status(404).end()
    // }
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
    // Note.findById(request.params.id).then(note => {
    //     response.json(note)
    // })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'Content Missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        // id: generateID(),
    })

    // notes = notes.concat(note)
    note.save().then(savedNote => {
        response.json(savedNote)
    })
    // console.log(note)
    // response.json(note)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})