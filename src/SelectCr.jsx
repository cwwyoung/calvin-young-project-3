import React from "react";

function SelectCr({ value, onChange }) {
  //   <select value={selectedNumber} onChange={handleChange}>
  //     {(() => {
  let options = [];
  for (let i = 0; i <= 24; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return (
    <>
      <label htmlFor="crSelect">Select Challenge Rating:</label>
      <select value={value} onChange={onChange}>
        {options}
      </select>
    </>
  );
}

export default SelectCr;
