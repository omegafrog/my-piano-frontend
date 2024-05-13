function DifficultyInput({ value, setSheetInfo }) {
  const changeDifficulty = (event) => {
    setSheetInfo((prev) => ({
      ...prev,
      sheet: {
        ...prev.sheet,
        difficulty: event.target.value,
      },
    }));
  };
  return (
    <input
      type="radio"
      name="difficulty"
      value={value}
      id={`difficulty${value}`}
      className="btn-check"
      onClick={changeDifficulty}
    />
  );
}
export default DifficultyInput;
