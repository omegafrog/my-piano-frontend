import { useContext, useEffect, useMemo, useState } from "react";
import GenreSelection from "./GenreSelectionInput";
import InstrumentSelection from "./InstrumentSelection";
import SettingPrice from "./SettingPrice";
import SheetPostDescription from "./SheetPostDescription";
import OrganizationSelection from "./OrganizationSelection";
import axios from "axios";
import { UserContext } from "../User-context";
import LyricsSelection from "./LyricsSelection";
import DifficultySelection from "./DifficultySelection";
import UploadFile from "./UploadFile";

function UploadSheet() {
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
  const { accessToken } = useContext(UserContext);
  const value = useMemo(
    () => ({ sheetInfo, setSheetInfo }),
    [sheetInfo, setSheetInfo]
  );

  const sendRequest = async (form) => {
    const result = await axios({
      method: "post",
      url: "/api/sheet/file",
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
      data: form,
    });
    const data = await JSON.parse(result.data.serializedData);
    let imageListItems = "";
    Object.values(data.resources).forEach((sheet) => {
      imageListItems += sheet;
      imageListItems += ",";
    });
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        filePath: imageListItems,
      },
    }));
  };

  const submitSheetPost = async () => {
    // send sheet data
    const sheetForm = document.querySelector("#sheetForm");
    let form1 = new FormData(sheetForm);
    await sendRequest(form1);

    const result = await axios.post("/api/sheet/write", value.sheetInfo, {
      headers: {
        Authorization: accessToken,
      },
    });
  };

  console.log("sheetInfo", sheetInfo);
  return (
    <div className="sheet-upload">
      <h1>악보 게시판 업로드</h1>
      <SettingPrice
        sheetInfo={value.sheetInfo}
        setSheetInfo={value.setSheetInfo}
      />

      <div className="sheet-upload-file">
        <UploadFile setSheetInfo={value.setSheetInfo} />
      </div>
      <SheetPostDescription
        sheetInfo={value.sheetInfo}
        setSheetInfo={value.setSheetInfo}
      />
      <GenreSelection
        sheetInfo={value.sheetInfo}
        setSheetInfo={value.setSheetInfo}
      />
      <InstrumentSelection setSheetInfo={value.setSheetInfo} />
      <div>
        <h3>편성</h3>
        <OrganizationSelection setSheetInfo={value.setSheetInfo} />
      </div>

      <div>
        <h3>가사 여부</h3>
        <LyricsSelection setSheetInfo={value.setSheetInfo} />
      </div>
      <div>
        <h3>난이도</h3>
        <DifficultySelection setSheetInfo={value.setSheetInfo} />
      </div>
      <div>
        <button type="button" className="btn btn-outline-secondary">
          리셋
        </button>
        <button
          type="button"
          onClick={submitSheetPost}
          className="btn btn-danger"
        >
          작성
        </button>
      </div>
    </div>
  );
}
export default UploadSheet;
