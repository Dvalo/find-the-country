const currentCountryReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_COUNTRY":
      return action.payload;
    default:
      return state;
  }
};

export default currentCountryReducer;
