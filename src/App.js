import React from "react";
import axios from "axios";
import CreateMap from "./Components/CreateMap";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesArr: [],
      currentCountryObj: {},
      currentCountry: "",
      currentContinent: "?",
      currentBordering: "?",
      playerCoins: 10,
    };
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        this.setState({ countriesArr: response.data });
        this.getRandomCountry();
      })
      .catch((error) => console.log(error));
  }

  getRandomCountry() {
    const { countriesArr } = this.state;

    let randCountry =
      countriesArr[Math.floor(Math.random() * countriesArr.length)];
    while (randCountry.area < 14500.0) {
      randCountry =
        countriesArr[Math.floor(Math.random() * countriesArr.length)];
    }
    this.setState({
      currentCountryObj: randCountry,
      currentCountry: randCountry.alpha2Code.toUpperCase(),
    });
  }

  newRound() {
    this.setState({
      currentContinent: "?",
      currentBordering: "?",
    });
    this.getRandomCountry();
  }

  handleClick = (e, countryCode) => {
    const { currentCountryObj, currentCountry } = this.state;
    if (countryCode === currentCountry) {
      if (
        currentCountryObj.population < 10000000 &&
        currentCountryObj.area < 210000.0
      ) {
        this.callNotification("corrHardCountry");
        this.setState({ playerCoins: this.state.playerCoins + 10 });
      } else {
        this.callNotification("corrNormCountry");
        this.setState({ playerCoins: this.state.playerCoins + 3 });
      }
    } else {
      this.callNotification("wrongCountry");
      this.setState({ playerCoins: this.state.playerCoins - 1 });
    }
    this.newRound();
  };

  callNotification = (type) => {
    if (type === "corrNormCountry") {
      this.makeNotification(
        "Great!",
        "You have found the country, you got 3 coins!",
        "success",
        3500
      );
    } else if (type === "corrHardCountry") {
      this.makeNotification(
        "Amazing!",
        "You have found difficult country, you got 10 coins!",
        "success",
        3500
      );
    } else if (type === "wrongCountry") {
      this.makeNotification(
        "Wrong!",
        "You chose the wrong country, deducting 1 coin!",
        "danger",
        3500
      );
    } else if (type === "contHintUsed") {
      this.makeNotification(
        "Heads up!",
        "You have used Continent Hint, removing 1 coin!",
        "info",
        3500
      );
    } else if (type === "bordHintUsed") {
      this.makeNotification(
        "Heads up!",
        "You have used Bordering Countries Hint, removing 4 coins!",
        "info",
        3500
      );
    }
  };

  makeNotification = (title, message, type, duration) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: duration,
      },
    });
  };

  regionTipShow = (e, countryCode, code) => {
    e.preventDefault();
  };

  getHint(type) {
    const { currentCountryObj, playerCoins } = this.state;
    if (type === "continent") {
      if (playerCoins >= 1) {
        this.callNotification("contHintUsed");
        this.setState({
          currentContinent: currentCountryObj.region,
          playerCoins: this.state.playerCoins - 1,
        });
      }
    } else if (type === "bordering") {
      if (playerCoins >= 4) {
        if (currentCountryObj.borders.length > 0) {
          this.callNotification("bordHintUsed");
          let displayStr = currentCountryObj.borders.join(", ");
          this.setState({
            currentBordering: displayStr,
            playerCoins: this.state.playerCoins - 4,
          });
        } else {
          this.setState({ currentBordering: "No bordering countries." });
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <ReactNotification />
        <div className="game-information">
          <div className="game-information-wrapper">
            <div className="game-objective">
              <div className="game-country game-div">
                Find: <span>{this.state.currentCountryObj.name}</span>
              </div>
              <div className="game-continent game-div">
                Continent: <span>{this.state.currentContinent}</span>
              </div>
              <div className="game-bordering game-div">
                Bordering Countries: <span>{this.state.currentBordering}</span>
              </div>
            </div>
            <div className="game-details">
              <div className="game-coins">
                Coins: <span>{this.state.playerCoins}</span>
              </div>
              <div className="game-hint">

                <div
                  className={
                    "hint-cont hint-btn " +
                    (this.state.currentContinent !== "?" ? "used" : "avail")}
                  onClick={() => this.getHint("continent")}>
                  Get Continent
                </div>

                <div
                  className={
                    "hint-border hint-btn " +
                    (this.state.currentBordering !== "?" ? "used" : "avail")}
                  onClick={() => this.getHint("bordering")}>
                  Get bordering countries
                </div>
              </div>
            </div>
          </div>
        </div>

        <CreateMap
          currentCountry={this.state.currentCountry}
          handleClick={this.handleClick}
          regionTipShow={this.regionTipShow}
        />
      </div>
    );
  }
}

export default App;
