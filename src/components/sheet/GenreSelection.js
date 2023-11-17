// class의 active의 여부로 선택 여부를 확인. onclick 이전에 수정되어서 고칠 일 없음.
import "../../scss/custom.scss";

import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";

// 2개 이상 선택할 때만 선택된거 풀어주면 됨
function GenreSelectionInput({ value, text, setSheetInfo }) {
  const changeGenre = (event) => {
    event.preventDefault();
    const genreBtns = document.querySelectorAll("#sheet-upload-genre button");
    const tmp = [];
    genreBtns.forEach((item) => {
      if (item.ariaPressed === "true") tmp.push(item.value);
    });
    const cnt = tmp.length;
    if (event.target.classList.contains("active")) {
      console.log("aa");
      if (cnt >= 3) {
        alert("3개 이상 선택할 수 없습니다.");
        event.target.classList.toggle("active");
        event.target.ariaPressed = "false";
        return;
      }
      console.log("genre add ok");
    } else {
      console.log("bb");
    }
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        genres: {
          genre1: tmp[0],
          genre2: tmp.length > 1 ? tmp[1] : null,
        },
      },
    }));
  };

  return (
    <Button
      variant="secondary"
      className="m-1"
      data-bs-toggle="button"
      value={value}
      onClick={changeGenre}
    >
      {text}
    </Button>
  );
}

function GenreSelection({ value }) {
  return (
    <div id="sheet-upload-genre">
      <h3>장르</h3>
      <div>
        <GenreSelectionInput
          value={0}
          setSheetInfo={value.setSheetInfo}
          text={"캐롤"}
        />
        <GenreSelectionInput
          value={1}
          setSheetInfo={value.setSheetInfo}
          text={"K-POP"}
        />
        <GenreSelectionInput
          value={2}
          setSheetInfo={value.setSheetInfo}
          text={"해외 POP"}
        />
        <GenreSelectionInput
          value={3}
          setSheetInfo={value.setSheetInfo}
          text={"뉴에이지"}
        />
        <GenreSelectionInput
          value={4}
          setSheetInfo={value.setSheetInfo}
          text={"클래식"}
        />
        <GenreSelectionInput
          value={5}
          setSheetInfo={value.setSheetInfo}
          text={"자작곡"}
        />
        <GenreSelectionInput
          value={6}
          setSheetInfo={value.setSheetInfo}
          text={"재즈"}
        />
        <GenreSelectionInput
          value={7}
          setSheetInfo={value.setSheetInfo}
          text={"연탄곡"}
        />
        <GenreSelectionInput
          value={9}
          setSheetInfo={value.setSheetInfo}
          text={"OST"}
        />
        <GenreSelectionInput
          value={8}
          setSheetInfo={value.setSheetInfo}
          text={"게임/애니"}
        />
        <GenreSelectionInput
          value={10}
          setSheetInfo={value.setSheetInfo}
          text={"동요"}
        />
        <GenreSelectionInput
          value={11}
          setSheetInfo={value.setSheetInfo}
          text={"BGM"}
        />
        <GenreSelectionInput
          value={12}
          setSheetInfo={value.setSheetInfo}
          text={"뮤지컬"}
        />
        <GenreSelectionInput
          value={13}
          setSheetInfo={value.setSheetInfo}
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

export const genreIdDict = {
  0: "CAROL",
  1: "K_POP",
  2: "POP",
  3: "NEW_AGE",
  4: "CLASSIC",
  5: "CUSTOM",
  6: "JAZZ",
  7: "DUET",
  8: "GAME_ANIME",
  9: "OST",
  10: "BGM",
  11: "KIDS",
  12: "MUSICAL",
  13: "RELIGIOUS",
};

export default GenreSelection;
