import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

const getAll = async () => {
  const res = await axios.get(`${baseUrl}/all`);
  return res.data;
};

const getByCC = async (cc) => {
  const res = await axios.get(`${baseUrl}/alpha/${cc}`);
  return res.data;
};

export default { getAll, getByCC };
