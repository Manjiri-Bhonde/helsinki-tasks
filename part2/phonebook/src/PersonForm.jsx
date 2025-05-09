import React from "react";

const PersonForm = ({
  addPhone,
  handleNumberChange,
  handleNameChange: handleChange,
  newEntry,
}) => {
  return (
    <div>
      {" "}
      <form onSubmit={addPhone}>
        <div>
          name: <input value={newEntry.name} onChange={handleChange} />
        </div>
        <div>
          number:{" "}
          <input value={newEntry.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
