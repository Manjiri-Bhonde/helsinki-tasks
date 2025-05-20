import { useEffect, useState } from "react";
import PersoFilter from "./PersoFilter";
import PersonForm from "./PersonForm";
import Directory from "./Directory";
import phoneApi from "./services/phonebook";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", number: 0 });
  const [searchValue, setSearchValue] = useState("");
  const [notifyMessage, setNotifyMessage] = useState({ msg: "", type: "" });
  const { getAllPhones, addNewPhone, deletePhone, updatePhone } = phoneApi;

  const addPhone = (event) => {
    event.preventDefault();
    const existingPerson = persons.filter(
      (person) => person.name === newEntry.name
    );
    if (existingPerson.length === 0) {
      const newPhoneAdded = newEntry;
      addNewPhone(newPhoneAdded)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewEntry({ name: "", number: 0 });
          phoneApi
            .create(newPhoneAdded)
            .then(() =>
              handleNotifiyChange(
                `${newEntry.name} added to phonebook `,
                "notify"
              )
            )
            .catch((error) =>
              handleNotifiyChange(
                `${newEntry.name} cant be added in phonebook`,
                "error"
              )
            );
        })
        .catch(() => {
          handleNotifiyChange(
            `${newEntry.name} cant be added in phonebook`,
            "error"
          );
        });
    } else {
      if (
        confirm(
          `${newEntry.name} already added to phonebook.Do you want to update number`
        )
      ) {
        const person = persons.find((person) => person.name === newEntry.name);
        const phoneChnaged = { ...person, number: newEntry.number };
        updatePhone(phoneChnaged)
          .then((response) => {
            setPersons(
              persons.map((single) =>
                single.id === person.id ? phoneChnaged : single
              )
            );
            setNewEntry({ name: "", number: 0 });

            handleNotifiyChange(
              `${newEntry.name} number changed to ${newEntry.number}`,
              "notify"
            );
          })
          .catch(() => {
            handleNotifiyChange(
              `${phoneChnaged.name} doesnt exist in phonebook`,
              "error"
            );
          });
      } else {
        setNewEntry({ name: "", number: 0 });
      }
    }
  };

  const handleDeletePhone = (id) => {
    persons.find((person) => person.id === id) &&
      deletePhone(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          const single = persons.find((person) => person.id === id);

          handleNotifiyChange(
            `${single.name} doesnt exist in phonebook`,
            "error"
          );
        });
  };

  const handleChange = (event) => {
    setNewEntry({ ...newEntry, name: event.target.value });
  };
  const handleNumberChange = (event) => {
    setNewEntry({ ...newEntry, number: event.target.value });
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

  const handleNotifiyChange = ({ msg, type }) => {
    if (type === "error") {
      setNotifyMessage({ msg, type });
      setTimeout(() => {
        setNotifyMessage({ msg: "", type: "" });
      }, 2000);
    } else {
      setNotifyMessage({ msg, type });
      setTimeout(() => {
        setNotifyMessage({ msg: "", type: "" });
      }, 2000);
    }
  };

  useEffect(() => {
    getAllPhones().then((response) => setPersons(response.data));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {console.log(notifyMessage)}
      {notifyMessage !== "" && (
        <div className={notifyMessage.type === "error" ? "error" : "notify"}>
          {notifyMessage.msg}
        </div>
      )}
      <PersoFilter searchValue={searchValue} onChange={handleSearchChange} />

      <h2>Add a new </h2>

      <PersonForm
        addPhone={addPhone}
        handleNameChange={handleChange}
        handleNumberChange={handleNumberChange}
        newEntry={newEntry}
      />
      <h2>Numbers</h2>
      <Directory
        filterNames={filterNames}
        handleDeletePhone={handleDeletePhone}
      />
    </div>
  );
};

export default App;
