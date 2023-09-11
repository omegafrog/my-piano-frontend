function DifficultyInput({ value, setSheetInfo }) {
  const changeDifficulty = (event) => {
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
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
