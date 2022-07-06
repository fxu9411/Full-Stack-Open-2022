import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()

    // Check if the element already exists
    if (persons.some(person => person.name === newName)) {

      const person = persons.find(p => p.name === newName)
      const msg = `${person.name} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(msg)) {
        const changedPerson = { ...person, number: newNumber }
        // axios.put(url, changedNote).then(response => {
        //   setNotes(notes.map(note => note.id !== id ? note : response.data))
        // })
        personsService
          .update(person.id, changedPerson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPersons))
          })
          .then(
            setErrorMessage(`Updated ${changedPerson.name}`)
          )
          .then(
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          )
      }
    } else if (newName.length === 0) {
      const message = 'Cannot insert empty name.'
      alert(message)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
        })
        .then(
          setErrorMessage(`Added ${personObject.name}`)
        )
        .then(
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        )
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(
          returnedPersons => {
            setPersons(returnedPersons)
          }
        )
        .catch(error => {
          setErrorMessage(
            `Information of ${person.name} was already removed from server.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Search nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Person</h2>
      <PersonForm addNewName={addNewName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} deletePerson={deletePerson} />
    </div >
  )
}

export default App;
