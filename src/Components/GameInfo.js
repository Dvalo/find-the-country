import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  usedHintNotif,
  notEnoughCoinsNotif,
  noBorderingNotif,
} from "../helpers/notifications";
import { connect } from "react-redux";
import { deductCoins, completeHint } from "../state/action/index";
import { getCountryName } from "../helpers/general";

function GameInfo({
  countries,
  country,
  coins,
  deductCoins,
  hints,
  completeHint,
}) {
  const hasBorderingCountries = country.borders && country.borders.length > 0;

  const getHint = (type) => {
    if (type === "continent") {
      if (coins >= 1) {
        completeHint("continent");
        deductCoins(1);
        usedHintNotif("Continent", 1);
      } else {
        notEnoughCoinsNotif();
      }
    } else if (type === "bordering") {
      if (coins >= 4) {
        completeHint("bordering");
        if (hasBorderingCountries) {
          deductCoins(4);
          usedHintNotif("Bordering Countries", 4);
        } else {
          noBorderingNotif();
        }
      } else {
        notEnoughCoinsNotif();
      }
    }
  };

  const findBordering = (cca3) => {
    return getCountryName(countries, cca3);
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
              {hints.continent && (
                <div className="game-continent game-div">
                  Continent: <span>{country.continents.join(", ")}</span>
                </div>
              )}
              {hints.bordering && hasBorderingCountries && (
                <div className="game-bordering game-div">
                  Bordering Countries:{" "}
                  <span>
                    {country.borders.map((currCountry, i) => {
                      return `${findBordering(currCountry)}${
                        country.borders.length - 1 === i ? "" : ", "
                      }`;
                    })}
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
                    "hint-cont hint-btn " + (hints.continent ? "used" : "avail")
                  }
                  onClick={() => getHint("continent")}
                >
                  Get Continent
                </div>

                <div
                  className={
                    "hint-border hint-btn " +
                    (hints.bordering ? "used" : "avail")
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

const mapStateToProps = (state) => ({
  coins: state.coins,
  hints: state.hints,
  countries: state.countries,
  country: state.currentCountry,
});

const mapDispatchToProps = (dispatch) => ({
  deductCoins: (amount) => dispatch(deductCoins(amount)),
  completeHint: (hintType) => dispatch(completeHint(hintType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
