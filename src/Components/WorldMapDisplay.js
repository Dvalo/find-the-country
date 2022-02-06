import React from "react";
import { correctGuessNotif, wrongGuessNotif } from "../helpers/notifications";
import { VectorMap } from "@react-jvectormap/core";
import worldMill from "@react-jvectormap/world/dist/worldMill.json";

import "react-toastify/dist/ReactToastify.css";

function WorldMapDisplay({ country, newRound, coins, setCoins }) {
  const handleClick = (e, countryCode) => {
    if (countryCode === country.cca2) {
      if (country.population < 10000000 && country.area < 210000.0) {
        correctGuessNotif("hard difficulty", 10);
        setCoins((prevCoins) => prevCoins + 10);
      } else {
        correctGuessNotif("easy difficulty", 3);
        setCoins((prevCoins) => prevCoins + 3);
      }
    } else {
      wrongGuessNotif();
      setCoins((prevCoins) => prevCoins - 1);
    }
    newRound();
  };

  return (
    <div className="map-wrapper">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={true}
        style={{
          width: "95%",
          margin: "0 auto",
          height: "85vh",
          border: "5px solid #131318",
        }}
        onRegionTipShow={(e) => e.preventDefault()}
        onRegionClick={handleClick}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#222230",
            "fill-opacity": 1,
          },
          hover: {
            "fill-opacity": 0.7,
            cursor: "cursor",
          },
        }}
      />
    </div>
  );
}

export default WorldMapDisplay;
