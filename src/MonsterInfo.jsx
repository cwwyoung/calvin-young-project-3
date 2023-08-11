import React from "react";

function MonsterInfo({ selectedMonsterName, selectedNumber }) {
  return (
    <div>
      <p>Selected CR: {selectedNumber}</p>
      <p>Monster Names: {selectedMonsterName}</p>
    </div>
  );
}

export default MonsterInfo;
