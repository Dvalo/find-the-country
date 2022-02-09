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
import HintBtn from "./HintBtn";
import HintDisplay from "./HintDisplay";
import hintsConfig from "../config/hints.constant";

function GameInfo({
  countries,
  country,
  coins,
  deductCoins,
  hints,
  completeHint,
}) {
  const hasBorderingCountries = country.borders && country.borders.length > 0;
  const hasCapital = country.capital && country.capital.length > 0;
  const hasContinents = country.continents && country.continents.length > 0;

  const flag = country.flags.svg || country.flags.png;
  const continents = hasContinents ? country.continents.join(", ") : null;
  const capital = hasCapital ? country.capital.join(", ") : null;
  const borderingCountries = hasBorderingCountries
    ? country.borders
        .map((currCountry) => findBordering(currCountry))
        .join(", ")
    : null;

  function getHint(hintType) {
    const { continent, bordering, capital, flag } = hintsConfig;
    if (
      hintType === continent.type ||
      hintType === bordering.type ||
      hintType === capital.type ||
      hintType === flag.type
    ) {
      if (coins >= hintsConfig[hintType].cost) {
        if (hintType === bordering.type && !hasBorderingCountries) {
          completeHint(hintsConfig[hintType].type);
          noBorderingNotif();
          return;
        }
        completeHint(hintsConfig[hintType].type);
        deductCoins(hintsConfig[hintType].cost);
        usedHintNotif(
          `'${hintsConfig[hintType].btnText}'`,
          hintsConfig[hintType].cost
        );
        return;
      }
      notEnoughCoinsNotif();
    }
  }

  function findBordering(cca3) {
    return getCountryName(countries, cca3);
  }

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
              {hints.flag && (
                <HintDisplay hint={flag} type={hintsConfig.flag.type} />
              )}
              {hints.continent && (
                <HintDisplay
                  text={hintsConfig.continent.displayText}
                  hint={continents}
                  type={hintsConfig.continent.type}
                />
              )}
              {hints.capital && (
                <HintDisplay
                  text={hintsConfig.capital.displayText}
                  hint={capital}
                  type={hintsConfig.capital.type}
                />
              )}
              {hints.bordering && hasBorderingCountries && (
                <HintDisplay
                  text={hintsConfig.bordering.displayText}
                  hint={borderingCountries}
                  type={hintsConfig.bordering.type}
                />
              )}
            </div>
            <div className="game-details">
              <div className="game-coins">
                Coins: <span>{coins}</span>
              </div>
              <div className="game-hint">
                <HintBtn
                  text={hintsConfig.continent.btnText}
                  used={hints.continent}
                  getHint={getHint}
                  type={hintsConfig.continent.type}
                />
                <HintBtn
                  text={hintsConfig.bordering.btnText}
                  used={hints.bordering}
                  getHint={getHint}
                  type={hintsConfig.bordering.type}
                />
                <HintBtn
                  text={hintsConfig.capital.btnText}
                  used={hints.capital}
                  getHint={getHint}
                  type={hintsConfig.capital.type}
                />
                <HintBtn
                  text={hintsConfig.flag.btnText}
                  used={hints.flag}
                  getHint={getHint}
                  type={hintsConfig.flag.type}
                />
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
