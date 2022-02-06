const reducer = (state = 10, action) => {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    case "DEDUCT":
      return state - action.payload;
    default:
      return state;
  }
};

export default reducer;
