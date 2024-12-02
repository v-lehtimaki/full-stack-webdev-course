import { useState, useEffect } from 'react'
import personService from './services/persons'

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        {text}
      </button>
    </>
  )
}

const Person = (props) => {
  return (
    <div>
      <p>
        <span>{props.name} {props.number} </span>
        <Button handleClick={() => props.deletePersonHandler(props.id, props.name)} text="delete" />
      </p>
    </div>
  )
}

const Persons = ({persons, deletePerson}) => {

  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} id={person.id} name={person.name} number={person.number}
        deletePersonHandler={deletePerson} />
      )}
    </div>
  )
}

const Filter = ({handleChange, filteredName}) => {
  return (
    <div>
      Filter shown with: <input 
      value={filteredName}
      onChange={handleChange} 
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addValues}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange} 
          />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  console.log('Hi there!')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(person => person.name === newName)
    if (!personExists) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log('Got the personResponse!: ', returnedPerson)
        })
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const person = persons.find(person => person.name === newName)  
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            alert(
              `The person '${changedPerson.name}' was already deleted from server!`
            )
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })    
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    console.log('Deleting: ', name)

    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          console.log('deletedPerson: ', deletedPerson)
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
    addFilteredPersons(event.target.value)
  }

  const addFilteredPersons = (filteredName) => {
    const personsToShow = persons.filter(person => 
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    )
    setPersons(personsToShow)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilteredNameChange} filteredName={filteredName} />
      <h2>Add a New Name </h2>
      <PersonForm 
        handleNameChange={handleNameChange} addValues={addNameAndNumber} newName={newName}
        handleNumberChange={handleNumberChange} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App