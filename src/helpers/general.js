export function getCountryName(countries, cca3) {
  const country = countries.filter((country) => country.cca3 === cca3);
  return country[0].name.common;
}
