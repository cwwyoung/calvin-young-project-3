import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MonsterInfo from "./MonsterInfo";

function App() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [challengeRatingAndName, setchallengeRatingAndName] = useState([]);
  const [selectedMonsterName, setSelectedMonsterName] = useState("No monsters");

  useEffect(() => {
    const url = "https://api.open5e.com/v1/monsters/";

    axios.get(url).then((response) => {
      const monsters = response.data.results;
      // const challengeRating = monsters.map((monster) => monster.cr);
      // const name = monsters.map((monster) => monster.name);
      const crData = monsters.map((monster) => ({
        cr: parseFloat(monster.cr),
        name: monster.name,
      }));
      setchallengeRatingAndName(crData);
      const selectedMonsterNames = crData
        .filter((data) => data.cr === selectedNumber)
        .map((data) => data.name);

      if (selectedMonsterNames.length === 0) {
        setSelectedMonsterName("No monsters");
      } else {
        const randomIndex = Math.floor(
          Math.random() * selectedMonsterNames.length
        );
        setSelectedMonsterName(selectedMonsterNames[randomIndex]);
      }
    });
  }, [selectedNumber]);

  // const selectedMonsterName =
  //   names[challengeRatingAndName.indexOf(selectedNumber)];
  // const selectedMonsterNames = challengeRatingAndName
  //   .filter((data) => data.cr === selectedNumber)
  //   .map((data) => data.name);

  const handleChange = (event) => {
    const crNumber = parseFloat(event.target.value);
    setSelectedNumber(crNumber);
  };

  // const filteredchallengeRatingAndName = challengeRatingAndName.filter(
  //   (rating) => parseFloat(rating) === parseFloat(selectedNumber)
  // );
  // const arrayCR = filteredchallengeRatingAndName.map((rating, index) => (
  //   <li key={index}>{rating}</li>
  // ));
  // console.log(arrayCR);
  // const combinedData = filteredchallengeRatingAndName.map((rating, index) => ({
  //   rating,
  //   monsterName: names[index],
  // }));
  // const arrayCRWithNames = combinedData.map((data, index) => (
  //   <li key={index}>
  //     {data.rating} - {data.name}
  //   </li>
  // ));

  return (
    <>
      <select value={selectedNumber} onChange={handleChange}>
        {(() => {
          let options = [];
          for (let i = 0; i <= 21; i++) {
            options.push(
              <option key={i} value={i}>
                {i}
              </option>
            );
          }
          return options;
        })()}
      </select>
      <MonsterInfo
        selectedMonsterName={selectedMonsterName}
        selectedNumber={selectedNumber}
      />
    </>
  );
}

export default App;
