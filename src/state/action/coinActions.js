export const addCoins = (amount) => ({
  type: "ADD",
  payload: amount,
});

export const deductCoins = (amount) => ({
  type: "DEDUCT",
  payload: amount,
});
