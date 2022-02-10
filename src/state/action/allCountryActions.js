import countryService from "../../api/countries";

export const setAllCountries = () => {
  return async (dispatch) => {
    const countries = await countryService.getAll();
    dispatch({
      type: "SET_ALL_COUNTRIES",
      payload: countries,
    });
  };
};
