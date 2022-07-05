import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    console.log('Effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise Fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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
