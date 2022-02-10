import { correctGuessNotif, wrongGuessNotif } from "../helpers/notifications";
import { VectorMap } from "@react-jvectormap/core";
import worldMill from "@react-jvectormap/world/dist/worldMill.json";
import { connect } from "react-redux";
import { addCoins, deductCoins } from "../state/action/index";

import "react-toastify/dist/ReactToastify.css";

function WorldMapDisplay({ country, newRound, addCoins, deductCoins }) {
  const handleClick = (e, countryCode) => {
    if (countryCode === "94c") {
      countryCode = "US";
    }
    if (countryCode === country.cca2) {
      if (country.population < 10000000 && country.area < 210000.0) {
        correctGuessNotif("hard difficulty", 10);
        addCoins(10);
      } else {
        correctGuessNotif("easy difficulty", 3);
        addCoins(3);
      }
    } else {
      wrongGuessNotif();
      deductCoins(1);
    }
    newRound();
  };

  return (
    <div className="game-map">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={true}
        style={{
          width: "100%",
          height: "calc(100vh - 135px)",
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

const mapStateToProps = (state) => ({
  coins: state.coins,
  country: state.currentCountry,
});

const mapDispatchToProps = (dispatch) => ({
  addCoins: (amount) => dispatch(addCoins(amount)),
  deductCoins: (amount) => dispatch(deductCoins(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapDisplay);
