import React, { useState, useEffect } from "react";
// import axios from "axios";
import WorldMapDisplay from "./components/WorldMapDisplay";
import GameInfo from "./components/GameInfo";
import { getCountryName } from "./helpers/general";

import dummy from "./dummy";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [coins, setCoins] = useState(10);

  useEffect(() => {
    setCountries(dummy);
    // axios
    //   .get("https://restcountries.com/v3.1/all")
    //   .then((response) => {
    //     setCountries(response.data);
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      getRandomCountry();
    }
  }, [countries]);

  const findBordering = (cca3) => {
    return getCountryName(countries, cca3);
  };

  const getRandomCountry = () => {
    let randCountry = countries[Math.floor(Math.random() * countries.length)];
    while (randCountry.area < 14500.0) {
      randCountry = countries[Math.floor(Math.random() * countries.length)];
    }
    setCurrentCountry(randCountry);
  };

  const newRound = () => {
    setCurrentCountry({});
    getRandomCountry();
  };

  return (
    <>
      <GameInfo
        country={currentCountry}
        coins={coins}
        setCoins={setCoins}
        findBordering={findBordering}
      />
      {Object.keys(currentCountry).length > 0 && (
        <WorldMapDisplay
          country={currentCountry}
          newRound={newRound}
          coins={coins}
          setCoins={setCoins}
        />
      )}
    </>
  );
}

export default App;
