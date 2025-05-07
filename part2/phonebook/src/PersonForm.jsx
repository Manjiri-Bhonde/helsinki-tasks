import React from "react";

const PersonForm = ({
  addPhone,
  newName,
  newNumber,
  handleNumberChange,
  handleNameChange: handleChange,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
