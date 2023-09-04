import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MonsterInfo from "./MonsterInfo";
import SelectCr from "./SelectCr";
import Stats from "./Stats";
import placeHolder from "./assets/placeholder.jpg";
import dice from "./assets/dice.png";
import Modal from "./Modal";

function App() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [challengeRatingAndName, setchallengeRatingAndName] = useState([]);
  const [selectedMonsterName, setSelectedMonsterName] = useState("No monsters");
  const [monsterDesc, setMonsterDesc] = useState("No description available");
  const [stats, setStats] = useState([]);
  const [selectedMonsterImageUrl, setSelectedMonsterImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
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
          "The bards sing not of this foul beast",
          "A shadowy figure that haunts the edge of our knowledge.",
          "Its name is whispered only in hushed tones, a creature of mystery.",
          "The monster vanishes into thin air, leaving behind only mystery.",
        ];

        const randomMessage = Math.floor(
          Math.random() * noMonsterMessage.length
        );

        if (selectedMonster.img) {
          setSelectedMonsterImageUrl(selectedMonster.img);
        } else {
          setSelectedMonsterImageUrl(placeHolder);
        }

        if (selectedMonster.desc !== "") {
          setMonsterDesc(
            selectedMonster.desc.replace(
              /\*\*(.*?)\*\*/g,
              (_, capturedText) => {
                return `${capturedText.toUpperCase()}:`;
              }
            )
          );
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
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData(selectedNumber);
  }, [selectedNumber]);

  const handleChange = (event) => {
    event.preventDefault();
    const crNumber = parseFloat(event.target.value);
    setSelectedNumber(crNumber);
  };

  const handleNewMonster = () => {
    fetchData(selectedNumber);
  };

  return (
    <>
      <div className="buttonContainer"></div>
      <h1>Monster Randomizer</h1>

      <div className="flexContainer">
        <SelectCr value={selectedNumber} onChange={handleChange} />

        <MonsterInfo
          selectedMonsterName={loading ? "Loading..." : selectedMonsterName}
          selectedNumber={selectedNumber}
        />
        <button onClick={handleNewMonster} className="randomDice">
          <img src={dice} alt="d20" className="randomDiceImg" />
        </button>
      </div>
      <Modal />
      <Stats stats={stats} />
      <p className="desc">{monsterDesc}</p>
      <div className="imgContainer">
        {selectedMonsterImageUrl ? (
          <img src={selectedMonsterImageUrl} alt="Monster" />
        ) : (
          <img src={placeHolder} alt="Placeholder" />
        )}
      </div>
    </>
  );
}

export default App;
