import { combineReducers } from "redux";
import coinReducer from "./coinReducer";
import hintReducer from "./hintReducer";
import allCountriesReducer from "./allCountriesReducer";
import currentCountryReducer from "./currentCountryReducer";

const reducers = combineReducers({
  coins: coinReducer,
  hints: hintReducer,
  countries: allCountriesReducer,
  currentCountry: currentCountryReducer,
});

export default reducers;
