const initialState = {
  continent: false,
  bordering: false,
  capital: false,
  flag: false,
};

const hintReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USE_HINT":
      return { ...state, [action.hint]: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default hintReducer;
