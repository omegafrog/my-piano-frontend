// class의 active의 여부로 선택 여부를 확인. onclick 이전에 수정되어서 고칠 일 없음.

import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "../../../css/GenreSelection.scss";

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
    <Button
      variant="secondary"
      className="m-1"
      data-bs-toggle="button"
      onClick={changeGenre}
      value={value}
    >
      {text}
    </Button>
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
    <div id="sheet-upload-genre">
      <h3>장르</h3>
      <div>
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={0}
          text={"캐롤"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={1}
          text={"K-POP"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={2}
          text={"해외 POP"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={3}
          text={"뉴에이지"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
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
          value={6}
          text={"재즈"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={7}
          text={"연탄곡"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={8}
          text={"게임/애니"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={9}
          text={"OST"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={10}
          text={"동요"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={11}
          text={"BGM"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={12}
          text={"뮤지컬"}
        />
        <GenreSelectionInput
          genreSetter={{ genres, setGenres }}
          value={13}
          text={"종교"}
        />
      </div>
    </div>
  );
}

export const genreDict = {
  CAROL: "캐롤",
  K_POP: "K-pop",
  POP: "해외 POP",
  NEW_AGE: "뉴에이지",
  CLASSIC: "클래식",
  CUSTOM: "자작곡",
  JAZZ: "재즈",
  DUET: "연탄곡",
  GAME_ANIME: "게임/애니",
  OST: "OST",
  BGM: "BGM",
  KIDS: "동요",
  MUSICAL: "뮤지컬",
  RELIGIOUS: "종교",
};

export default GenreSelection;
