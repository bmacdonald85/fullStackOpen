import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [phonebookFilter, setPhonebookFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePhonebookFilterChange = (event) => {
    setPhonebookFilter(event.target.value)
  }

  const handlePhonebookSubmit = (event) => {
    event.preventDefault()
    if (newName.trim() === '') {
      handleNotification('Name cannot be empty', 'error')
      return
    }
    if (newNumber.trim() === '') {
      handleNotification('Number cannot be empty', 'error')
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber
    }

    createOrUpdatePerson(newPerson);
    
    setNewName('')
    setNewNumber('')
  }

  const createOrUpdatePerson = (newPerson) => {
    const existingPerson = persons.find(person => person.name === newPerson.name)
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the  old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newPerson.number }
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
            handleNotification(`Updated ${newPerson.name}`, 'success')
          })
          .catch(error => {
            console.error('Error updating person:', error)
            handleNotification(`Failed to update ${newPerson.name}`, 'error')
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          handleNotification(`Added ${newPerson.name}`, 'success')
        })
        .catch(error => {
          console.error('Error adding person:', error)
          handleNotification(`Failed to add ${newPerson.name}`, 'error')
        })
    }
  }

  const handlePersonDelete = (name) => {
    const personToDelete = persons.find(person => person.name === name)
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          handleNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          handleNotification(`Information of ${name} has already been removed from server`, 'error')
        })
    }
  }

  const handleNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <Filter phonebookFilter={phonebookFilter} handlePhonebookFilterChange={handlePhonebookFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handlePhonebookSubmit={handlePhonebookSubmit}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} phonebookFilter={phonebookFilter} handlePersonDelete={handlePersonDelete} />

    </div>
  )
}

export default App