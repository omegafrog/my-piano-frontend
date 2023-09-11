// class의 active의 여부로 선택 여부를 확인. onclick 이전에 수정되어서 고칠 일 없음.
// 2개 이상 선택할 때만 선택된거 풀어주면 됨
function GenreSelectionInput({ sheetInfo, setSheetInfo, value, text }) {
  const changeGenre = (event) => {
    event.preventDefault();
    if (event.target.classList.contains("active")) {
      console.log("aa");
      if (sheetInfo.sheetDto.genres.length >= 2) {
        alert("2개 이상 선택할 수 없습니다.");
        event.target.classList.toggle("active");
        return;
      }
      setSheetInfo((prev) => ({
        ...prev,
        sheetDto: {
          genres: [...prev.sheetDto.genres, event.target.value],
        },
      }));
    } else {
      console.log("bb");
      const after = sheetInfo.sheetDto.genres.filter(
        (genre) => genre !== event.target.value
      );
      setSheetInfo((prev) => ({
        ...prev,
        sheetDto: {
          genres: after,
        },
      }));
    }
  };
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="button"
      onClick={changeGenre}
      value={value}
    >
      {text}
    </button>
  );
}

function GenreSelection({ sheetInfo, setSheetInfo }) {
  return (
    <div className="sheet-upload-genre">
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"carol"}
        value={"0"}
        text={"캐롤"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"kpop"}
        value={"1"}
        text={"K-POP"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"pop"}
        value={"2"}
        text={"해외 POP"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"newage"}
        value={"3"}
        text={"뉴에이지"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"classic"}
        value={"4"}
        text={"클래식"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"custom"}
        value={"5"}
        text={"자작곡"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"jazz"}
        value={"6"}
        text={"재즈"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"duet"}
        value={"7"}
        text={"연탄곡"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"game_anime"}
        value={"8"}
        text={"게임/애니"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"ost"}
        value={"9"}
        text={"OST"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"kids"}
        value={"10"}
        text={"동요"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"bgm"}
        value={"11"}
        text={"BGM"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"musical"}
        value={"12"}
        text={"뮤지컬"}
      />
      <GenreSelectionInput
        sheetInfo={sheetInfo}
        setSheetInfo={setSheetInfo}
        id={"religious"}
        value={"13"}
        text={"종교"}
      />
    </div>
  );
}

export default GenreSelection;
