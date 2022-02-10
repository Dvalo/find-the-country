function HintBtn({ text, used, getHint, type }) {
  return (
    <div
      className={`hint-btn hint-${type} ` + (used ? "used" : "avail")}
      onClick={() => getHint(type)}
    >
      {text}
    </div>
  );
}

export default HintBtn;
