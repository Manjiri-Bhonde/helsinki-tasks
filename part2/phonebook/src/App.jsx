import { useState } from "react";
import PersoFilter from "./PersoFilter";
import PersonForm from "./PersonForm";
import Directory from "./Directory";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const addPhone = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name !== newName)) {
      const newPhoneAdded = { name: newName, number: newNumber };
      setPersons(persons.concat(newPhoneAdded));
      setNewName("");
      setNewNumber(0);
    } else {
      alert(`${newName} already added to phonebook`);
    }
  };
  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterNames = () => {
    const searchname = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return searchname || [];
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <PersoFilter searchValue={searchValue} onChange={handleSearchChange} />

      <h2>Add a new </h2>

      <PersonForm
        addPhone={addPhone}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Directory filterNames={filterNames} />
    </div>
  );
};

export default App;
