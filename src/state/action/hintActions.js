export const completeHint = (hintType) => ({
  type: "USE_HINT",
  hint: hintType,
});

export const resetHints = () => ({
  type: "RESET",
});
