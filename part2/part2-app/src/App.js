import Note from './components/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A New Note...')
  const [showAll, setShowAll] = useState(false)

  const hook = () => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('Promise Fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(hook, [])

  console.log('Render', notes.length, 'notes')

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div >
  )
}

export default App