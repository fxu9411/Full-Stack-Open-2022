import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

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
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Person</h2>
      <PersonForm addNewName={addNewName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} />
    </div >
  )
}

export default App;
