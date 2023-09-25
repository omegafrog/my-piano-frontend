import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";

function InstrumentSelectionInput({ setSheetInfo, value, text }) {
  const changeInstrument = (event) => {
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        instrument: event.target.value,
      },
    }));
  };
  return (
    <div>
      <input
        type="radio"
        className="btn-check"
        name="instrument"
        id={`instrument${value}`}
        autoComplete="off"
        onClick={changeInstrument}
        value={value}
      />
      <label className="btn btn-secondary" htmlFor={`instrument${value}`}>
        {text}
      </label>
    </div>
  );
}

function InstrumentSelection({ setSheetInfo }) {
  const [index, setIndex] = useState("piano");
  const changeIndex = (event) => {
    console.log("value", event.target.value);
    // 다른 tab 선택 시
    if (index !== event.target.value) {
      const currentDetailsDiv = document.getElementById(index);
      currentDetailsDiv.style.display = "none";
      setIndex(event.target.value);
      const detailsDiv = document.getElementById(event.target.value);
      detailsDiv.style.display = "block";
    }
  };
  return (
    <div>
      <div className="instrument-select-index">
        <button value={"piano"} onClick={changeIndex}>
          피아노
        </button>
        <button value={"guitar"} onClick={changeIndex}>
          기타
        </button>
        <button value={"string"} onClick={changeIndex}>
          현악기
        </button>
        <button value={"wooden"} onClick={changeIndex}>
          목관악기
        </button>
        <button value={"steel"} onClick={changeIndex}>
          금관악기
        </button>
      </div>
      <div className="instrument-select-detail">
        <div id="piano" style={{ display: "block" }}>
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={0}
            text={"피아노 88키"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={1}
            text={"피아노 61키"}
          />
        </div>
        <div id="guitar" style={{ display: "none" }}>
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={2}
            text={"어쿠스틱"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={3}
            text={"일렉트릭"}
          />
        </div>
        <div id="string" style={{ display: "none" }}>
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={4}
            text={"베이스"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={5}
            text={"우쿨렐레"}
          />
        </div>
        <div id="wooden" style={{ display: "none" }}>
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={6}
            text={"바이올린"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={7}
            text={"비올라"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={8}
            text={"첼로"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={9}
            text={"베이스"}
          />
        </div>
        <div id="steel" style={{ display: "none" }}>
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={10}
            text={"플루트"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={11}
            text={"피콜로"}
          />
          <InstrumentSelectionInput
            setSheetInfo={setSheetInfo}
            value={12}
            text={"오보에"}
          />
        </div>
      </div>
    </div>
  );
}
export default InstrumentSelection;

export const instrumentDict = {
  PIANO_KEY_88: "88키",
  PIANO_KEY_61: "61키",

  GUITAR_ACOUSTIC: "어쿠스틱",
  GUITAR_ELECTRIC: "일렉트릭",
  GUITAR_BASE: "베이스",
  GUITAR_UKULELE: "우쿨렐레",

  STRING_VIOLIN: "바이올린",
  STRING_VIOLA: "비올라",
  STRING_CELLO: "첼로",
  STRING_BASE: "베이스",

  WOODWIND_FLUTE: "플루트",
  WOODWIND_PICCOLO: "피콜로",
  WOODWIND_OBOE: "오보에",
};
