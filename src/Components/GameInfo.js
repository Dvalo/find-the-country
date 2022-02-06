import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  usedHintNotif,
  notEnoughCoinsNotif,
  noBorderingNotif,
} from "../helpers/notifications";

function GameInfo({ country, coins, setCoins, findBordering }) {
  const [continentHint, setContinentHint] = useState(false);
  const [borderHint, setborderHint] = useState(false);

  const getHint = (type) => {
    if (type === "continent") {
      if (coins >= 1) {
        setContinentHint(true);
        setCoins((prevCoins) => prevCoins - 1);
        usedHintNotif("Continent", 1);
      } else {
        notEnoughCoinsNotif();
      }
    } else if (type === "bordering") {
      if (coins >= 4) {
        setborderHint(true);
        // TODO error proof if country has no borders
        if (country.borders.length > 0) {
          setCoins((prevCoins) => prevCoins - 4);
          usedHintNotif("Bordering Countries", 4);
        } else {
          noBorderingNotif();
        }
      } else {
        notEnoughCoinsNotif();
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      {Object.keys(country).length > 0 && (
        <div className="game-information">
          <div className="game-information-wrapper">
            <div className="game-objective">
              <div className="game-country game-div">
                Find: <span>{country.name.common}</span>
              </div>
              {continentHint && (
                <div className="game-continent game-div">
                  Continent: <span>{country.continents.join(", ")}</span>
                </div>
              )}
              {borderHint && (
                <div className="game-bordering game-div">
                  Bordering Countries:{" "}
                  <span>
                    {country.borders.map(
                      (currCountry, i) =>
                        `${findBordering(currCountry)}${
                          country.borders.length - 1 === i ? "" : ", "
                        }`
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="game-details">
              <div className="game-coins">
                Coins: <span>{coins}</span>
              </div>
              <div className="game-hint">
                <div
                  className={
                    "hint-cont hint-btn " + (continentHint ? "used" : "avail")
                  }
                  onClick={() => getHint("continent")}
                >
                  Get Continent
                </div>

                <div
                  className={
                    "hint-border hint-btn " + (borderHint ? "used" : "avail")
                  }
                  onClick={() => getHint("bordering")}
                >
                  Get bordering countries
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameInfo;
