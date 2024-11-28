import { useState } from 'react'

const Person = (props) => {
  return (
    <p>
      <span>{props.name} {props.number}</span>
    </p>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
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
  const [persons, setPersons] = useState([
    { name: 'Ville Lehtimäki', number: '+3581234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(person => person.name === newName)
    if (!personExists) {
      setPersons(persons.concat(nameObject))
    } else {
      alert(`${newName} is already added to phonebook!`)
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
      <Persons persons={persons} />
    </div>
  )
}

export default App