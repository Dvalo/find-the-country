function HintDisplay({ text, hint, type }) {
  return (
    <div className={`game-div game-${type}`}>
      {type !== "flag" ? (
        <>
          {text}: <span>{hint}</span>
        </>
      ) : (
        <img src={hint} alt="country flag" width={90} height={50} />
      )}
    </div>
  );
}

export default HintDisplay;
