import React from "react";
import phoneApi from "./services/phonebook";

const Directory = ({ filterNames, handleDeletePhone }) => {
  return (
    <div>
      {filterNames().map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePhone(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Directory;
