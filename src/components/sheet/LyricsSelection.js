function LyricsSelection({ setSheetInfo }) {
  const changeLyrics = (event) => {
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        lyrics: event.target.value,
      },
    }));
  };
  return (
    <div className="w-100">
      <h3>가사 여부</h3>
      <div className="btn-group" role="group" aria-label="Lyrics">
        <input
          type="radio"
          name="lyrics"
          value={true}
          id={"lyrics1"}
          className="btn-check"
          onClick={changeLyrics}
        />
        <label htmlFor="lyrics1" className="btn btn-primary">
          가사 포함
        </label>
        <input
          type="radio"
          name="lyrics"
          value={false}
          id={"lyrics0"}
          className="btn-check"
          onClick={changeLyrics}
        />
        <label htmlFor="lyrics0" className="btn btn-primary">
          가사 미포함
        </label>
      </div>
    </div>
  );
}
export default LyricsSelection;
