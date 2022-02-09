function HintBtn({ text, used, getHint, type }) {
  return (
    <div
      className={"hint-border hint-btn " + (used ? "used" : "avail")}
      onClick={() => getHint(type)}
    >
      {text}
    </div>
  );
}

export default HintBtn;
