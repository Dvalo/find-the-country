export const setAllCountries = (countries) => ({
  type: "SET_ALL_COUNTRIES",
  payload: countries,
});

export const setCurrentCountry = (country) => ({
  type: "SET_CURRENT_COUNTRY",
  payload: country,
});
