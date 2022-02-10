const allCountriesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_COUNTRIES":
      return action.payload;
    default:
      return state;
  }
};

export default allCountriesReducer;
