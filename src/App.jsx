import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MonsterInfo from "./MonsterInfo";
import SelectCr from "./SelectCr";
import placeHolder from "./assets/placeholder.jpg";

function App() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [challengeRatingAndName, setchallengeRatingAndName] = useState([]);
  const [selectedMonsterName, setSelectedMonsterName] = useState("No monsters");
  const [monsterDesc, setMonsterDesc] = useState("No description available");
  const [stats, setStats] = useState([]);
  const [selectedMonsterImageUrl, setSelectedMonsterImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 49) + 1;
        const url = `https://api.open5e.com/v1/monsters/?page=${randomPage}`;

        const response = await axios.get(url);
        const monsters = response.data.results;

        const crData = monsters.map((monster) => ({
          cr: Math.floor(parseFloat(monster.cr)),
          name: monster.name,
          desc: monster.desc,
          img: monster.img_main,
          hp: monster.hit_points,
          str: monster.strength,
          dex: monster.dexterity,
          con: monster.constitution,
          int: monster.intelligence,
          wis: monster.wisdom,
          cha: monster.charisma,
        }));

        setchallengeRatingAndName(crData);

        const selectedMonsterNames = crData
          .filter((data) => data.cr === selectedNumber)
          .map((data) => data.name);

        if (selectedMonsterNames.length === 0) {
          setSelectedMonsterName("No monsters");
          setMonsterDesc("No description available");
        } else {
          const randomIndex = Math.floor(
            Math.random() * selectedMonsterNames.length
          );

          setSelectedMonsterName(selectedMonsterNames[randomIndex]);

          const selectedMonster = crData.find(
            (data) => data.name.trim() === selectedMonsterNames[randomIndex]
          );

          const noMonsterMessage = [
            "No description available",
            "No written record exists of such a creature",
            "Even the bravest scholars feign ignorance of such a beast",
            "No surviving records of this monster",
            "Only unsubstantiated rumors of this monstrosity are passed about the tavern",
            "Studies of this monster have yet to yield constructive description",
            "Only parables and barmy hearsay survive",
            "A fabled entity who belies the gaze of even elder gods",
            "The monster escapes the scrolls of our most ecumenical clerics",
          ];

          const randomMessage = Math.floor(
            Math.random() * noMonsterMessage.length
          );

          if (selectedMonster && selectedMonster.img) {
            setSelectedMonsterImageUrl(selectedMonster.img);
          } else {
            setSelectedMonsterImageUrl(placeHolder);
          }

          if (!selectedMonster.desc === "") {
            setMonsterDesc(selectedMonster.desc);
          } else {
            setMonsterDesc(noMonsterMessage[randomMessage]);
          }

          setStats({
            hp: selectedMonster.hp,
            str: selectedMonster.str,
            dex: selectedMonster.dex,
            con: selectedMonster.con,
            int: selectedMonster.int,
            wis: selectedMonster.wis,
            cha: selectedMonster.cha,
          });
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [selectedNumber]);

  // useEffect(() => {
  //   const randomPage = Math.floor(Math.random() * 49) + 1;
  //   const url = `https://api.open5e.com/v1/monsters/?page=${randomPage}`;

  //   axios.get(url).then((response) => {
  //     const monsters = response.data.results;
  //     // const challengeRating = monsters.map((monster) => monster.cr);
  //     // const name = monsters.map((monster) => monster.name);
  //     const crData = monsters.map((monster) => ({
  //       cr: Math.floor(parseFloat(monster.cr)),
  //       name: monster.name,
  //       desc: monster.desc,
  //     }));

  //     setchallengeRatingAndName(crData);

  //     const selectedMonsterNames = crData
  //       .filter((data) => data.cr === selectedNumber)
  //       .map((data) => data.name);

  //     if (selectedMonsterNames.length === 0) {
  //       setSelectedMonsterName("No monsters");
  //     } else {
  //       const randomIndex = Math.floor(
  //         Math.random() * selectedMonsterNames.length
  //       );
  //       setSelectedMonsterName(selectedMonsterNames[randomIndex]);

  //       const selectedMonster = challengeRatingAndName.find(
  //         (data) => data.name.trim() === selectedMonsterName
  //       );
  //       if (selectedMonster) {
  //         setMonsterDesc(selectedMonster.desc);
  //       } else {
  //         setMonsterDesc("No description available");
  //       }
  //     }
  //   });
  // }, [selectedNumber]);

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
      <h1>Monster Randomizer</h1>
      <div className="flexContainer">
        <SelectCr value={selectedNumber} onChange={handleChange} />
        <MonsterInfo
          selectedMonsterName={selectedMonsterName}
          selectedNumber={selectedNumber}
        />
      </div>
      <p>{monsterDesc}</p>
      {challengeRatingAndName.length > 0 ? (
        <img src={challengeRatingAndName[0].img || placeHolder} />
      ) : (
        <img src={placeHolder} alt="Placeholder" />
      )}
      <div className="stats">
        <h2>Stats</h2>
        <p>Hit Points: {stats.hp}</p>
        <p>Strength: {stats.str}</p>
        <p>Dexterity: {stats.dex}</p>
        <p>Constitution: {stats.con}</p>
        <p>Intelligence: {stats.int}</p>
        <p>Wisdom: {stats.wis}</p>
        <p>Charisma: {stats.cha}</p>
      </div>
    </>
  );
}

export default App;
