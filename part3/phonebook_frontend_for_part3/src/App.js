import { useEffect, useState } from 'react'
import PersonForm from './Components/PersonForm'
import SearchFilter from './Components/SearchFilter'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [successfulOperation, setSuccessfulOperation] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(res => setPersons(res))
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  const handleChange = (event) => {
    event.preventDefault()
    switch(event.target.name){
      case "name":
        setNewName(event.target.value)
        break
      case "number":
        setNewNumber(event.target.value)
        break
      default:
        return
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //Commenting the line below so that the server can be tested for such cases
    //if(!newName || !newNumber) return
    if(persons.find(p => p.name === newName && p.number === newNumber)){
      window.alert("Already in phonebook")
      setNewName('')
      setNewNumber('')
      return
    }
    const existingPerson = persons.find(p => p.name === newName && newNumber !== p.number)
    if(existingPerson) {
      if(window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)){
        personsService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(res => {
            const index = persons.findIndex(p => p.id === existingPerson.id)
            const newPersons = [...persons]
            newPersons[index] = res
            setPersons(newPersons)
          })
          .catch(() => {
            setNotification(
              `Information of ${newName} has been already removed from the server`
            )
            setSuccessfulOperation(false)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      personsService
        .create({name: newName, number: newNumber})
        .then(res => {
          setPersons(persons.concat(res))
          setNotification(
            `Added ${res.name} to the server`
          )
          setSuccessfulOperation(true)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(() => {
          setNotification(
            `${newName} could not be added server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
      setNewName('')
      setNewNumber('')
  }

  const handleDelete = (person) => {
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personsService
        .delete(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        success={successfulOperation}
      />
      <SearchFilter 
        search={search}
        handleSearch={handleSearch}
      />
      <h3>Add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App