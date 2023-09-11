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
    <div className="btn-group" role="group" aria-label="Lyrics">
      <input
        type="radio"
        name="lyrics"
        value={1}
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
        value={0}
        id={"lyrics0"}
        className="btn-check"
        onClick={changeLyrics}
      />
      <label htmlFor="lyrics0" className="btn btn-primary">
        가사 미포함
      </label>
    </div>
  );
}
export default LyricsSelection;
