import React, { useEffect } from "react";
// import axios from "axios";
import WorldMapDisplay from "./components/WorldMapDisplay";
import GameInfo from "./components/GameInfo";
import { connect } from "react-redux";
import {
  resetHints,
  setAllCountries,
  setCurrentCountry,
} from "./state/action/index";

import "./App.css";

function App({
  countries,
  resetHints,
  setAllCountries,
  currentCountry,
  setCurrentCountry,
}) {
  // useEffect(() => {
  //   axios
  //     .get("https://restcountries.com/v3.1/all")
  //     .then((response) => {
  //       setAllCountries(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    if (countries.length > 0) {
      getRandomCountry();
    }
  }, [countries]);

  const getRandomCountry = () => {
    let randCountry = countries[Math.floor(Math.random() * countries.length)];
    while (randCountry.area < 14500.0) {
      randCountry = countries[Math.floor(Math.random() * countries.length)];
    }
    setCurrentCountry(randCountry);
  };

  const newRound = () => {
    getRandomCountry();
    resetHints();
  };

  return (
    <>
      {Object.keys(currentCountry).length > 0 && (
        <>
          <GameInfo />
          <WorldMapDisplay
            newRound={newRound}
            key={currentCountry.name.common}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  countries: state.countries,
  currentCountry: state.currentCountry,
});

const mapDispatchToProps = (dispatch) => ({
  resetHints: () => dispatch(resetHints()),
  setAllCountries: (countries) => dispatch(setAllCountries(countries)),
  setCurrentCountry: (country) => dispatch(setCurrentCountry(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
