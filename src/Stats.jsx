import React from "react";

function Stats({ stats }) {
  return (
    <div>
      <h3>Hit Points: {stats.hp}</h3>
      <div className="stats">
        <div className="statsContainer">
          <p>Strength: {stats.str}</p>
          <p>Dexterity: {stats.dex}</p>
          <p>Constitution: {stats.con}</p>
          <p>Intelligence: {stats.int}</p>
          <p>Wisdom: {stats.wis}</p>
          <p>Charisma: {stats.cha}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
