import React from "react";

const PersoFilter = ({searchValue,onChange}) => {
  return (
    <div>
      filter shown with :{" "}
      <input value={searchValue} onChange={onChange} />
    </div>
  );
};

export default PersoFilter;
