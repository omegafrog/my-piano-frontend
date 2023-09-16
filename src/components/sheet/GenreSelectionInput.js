// class의 active의 여부로 선택 여부를 확인. onclick 이전에 수정되어서 고칠 일 없음.

import { useEffect, useState } from "react";

// 2개 이상 선택할 때만 선택된거 풀어주면 됨
function GenreSelectionInput({ genreSetter, value, text }) {
  const changeGenre = (event) => {
    event.preventDefault();
    if (event.target.classList.contains("active")) {
      console.log("aa");
      if (genreSetter.genres.length >= 2) {
        alert("2개 이상 선택할 수 없습니다.");
        event.target.classList.toggle("active");
        return;
      }
      console.log("genre add ok");
      genreSetter.setGenres((prev) => [...prev, event.target.value]);
    } else {
      console.log("bb");
      const after = genreSetter.genres.filter(
        (genre) => genre !== event.target.value
      );
      genreSetter.setGenres(after);
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

function GenreSelection({ value }) {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    console.log(genres);
    value.setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        genres: {
          genre1: genres[0],
          genre2: genres.length > 1 ? genres[1] : null,
        },
      },
    }));
  }, [genres]);
  return (
    <div className="sheet-upload-genre">
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"carol"}
        value={0}
        text={"캐롤"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"kpop"}
        value={1}
        text={"K-POP"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"pop"}
        value={2}
        text={"해외 POP"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"newage"}
        value={3}
        text={"뉴에이지"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"classic"}
        value={4}
        text={"클래식"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"custom"}
        value={5}
        text={"자작곡"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"jazz"}
        value={6}
        text={"재즈"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"duet"}
        value={7}
        text={"연탄곡"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"game_anime"}
        value={8}
        text={"게임/애니"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"ost"}
        value={9}
        text={"OST"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"kids"}
        value={10}
        text={"동요"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"bgm"}
        value={11}
        text={"BGM"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"musical"}
        value={12}
        text={"뮤지컬"}
      />
      <GenreSelectionInput
        genreSetter={{ genres, setGenres }}
        id={"religious"}
        value={13}
        text={"종교"}
      />
    </div>
  );
}

export default GenreSelection;
