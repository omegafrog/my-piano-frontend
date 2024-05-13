import DifficultyInput from "./DifficultyInput";

function DifficultySelection({ setSheetInfo }) {
  return (
    <div className="w-75">
      <h3>난이도</h3>
      <div className="btn-group" role="group" aria-label="Difficulty">
        <DifficultyInput setSheetInfo={setSheetInfo} value={0} />
        <label htmlFor="difficulty0" className="btn btn-primary">
          매우 쉬움
        </label>
        <DifficultyInput setSheetInfo={setSheetInfo} value={1} />
        <label htmlFor="difficulty1" className="btn btn-primary">
          쉬움
        </label>
        <DifficultyInput setSheetInfo={setSheetInfo} value={2} />
        <label htmlFor="difficulty2" className="btn btn-primary">
          보통 쉬움
        </label>
        <DifficultyInput setSheetInfo={setSheetInfo} value={3} />
        <label htmlFor="difficulty3" className="btn btn-primary">
          어려움
        </label>
        <DifficultyInput setSheetInfo={setSheetInfo} value={4} />
        <label htmlFor="difficulty4" className="btn btn-primary">
          매우 어려움
        </label>
      </div>
    </div>
  );
}
export default DifficultySelection;

export const difficultyDict = {
  VERY_EASY: "매우 쉬움",
  EASY: "쉬움",
  MEDIUM: "보통",
  HARD: "어려움",
  VERY_HARD: "매우 어려움",
};

export const difficultyIdDict = {
  0: "VERY_EASY",
  1: "EASY",
  2: "MEDIUM",
  3: "HARD",
  4: "VERY_HARD",
};
