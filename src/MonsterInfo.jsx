import React from "react";

function MonsterInfo({ selectedMonsterName, selectedNumber }) {
  return (
    <div>
      {/* <p className="info">Selected CR: {selectedNumber}</p> */}
      <p className="info">{selectedMonsterName}</p>
    </div>
  );
}

export default MonsterInfo;
