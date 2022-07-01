import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()

    // Check if the element already exists
    if (persons.some(person => person.name === newName)) {
      const message = `${newName} is already added to phonebook`
      console.log(message)
      alert(message)
    } else if (newName.length === 0) {
      const message = 'Cannot insert empty name.'
      alert(message)
    } else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          <div>
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App;
