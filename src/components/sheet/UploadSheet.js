import { useContext, useEffect, useState } from "react";
import Editor from "./editor";
import GenreSelection from "./GenreSelectionInput";
import InstrumentSelection from "./InstrumentSelection";

function UploadSheet() {
  const [isFree, setFree] = useState(true);
  const [sheetInfo, setSheetInfo] = useState({
    title: "",
    content: "",
    price: 0,
    discountRate: 0,
    sheetDto: {
      title: "",
      pageNum: 0,
      difficulty: 0,
      instrument: 0,
      genres: [],
      isSolo: true,
      lyrics: false,
      filePath: "",
    },
  });
  const changeSheetTitle = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: { ...prev.sheetDto, title: event.target.value },
    }));
  };
  const changeTitle = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      title: event.target.title,
    }));
  };
  const changePrice = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      price: event.target.price,
    }));
  };
  const changeContent = (event) => {
    event.preventDefault();
    setSheetInfo((prev) => ({
      ...prev,
      content: event.target.content,
    }));
  };

  console.log("sheetInfo", sheetInfo);
  return (
    <div className="sheet-upload">
      <h1>악보 게시판 업로드</h1>
      <input
        type="radio"
        id="free"
        name="cost-radio"
        value={"free"}
        onClick={() => setFree(true)}
      />
      <label htmlFor="free">무료</label>

      <input
        type="radio"
        id="pay"
        name="cost-radio"
        value={"pay"}
        onClick={() => setFree(false)}
      />
      <label htmlFor="pay">유료</label>

      {isFree ? null : (
        <div className="sheet-upload-price">
          <span>소비자가격(원화, 부가세 포함)</span>
          <input type="number" value={sheetInfo.price} onChange={changePrice} />
        </div>
      )}

      <div className="sheet-upload-file">파일을 첨부해라</div>
      <input
        type="text"
        placeholder="곡 제목"
        value={sheetInfo.sheetDto.title}
        onChange={changeSheetTitle}
      />
      <input
        type="text"
        placeholder="글 제목"
        value={sheetInfo.title}
        onChange={changeTitle}
      />
      <Editor onChange={changeContent} />
      <GenreSelection sheetInfo={sheetInfo} setSheetInfo={setSheetInfo} />
      <InstrumentSelection sheetInfo={sheetInfo} setSheetInfo={setSheetInfo} />
    </div>
  );
}
export default UploadSheet;
