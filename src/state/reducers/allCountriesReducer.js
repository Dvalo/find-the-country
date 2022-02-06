import dummy from "../../dummy";

const allCountriesReducer = (state = dummy, action) => {
  switch (action.type) {
    case "SET_ALL_COUNTRIES":
      return action.payload;
    default:
      return state;
  }
};

export default allCountriesReducer;
