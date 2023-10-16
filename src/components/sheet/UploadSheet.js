import { useContext, useEffect, useMemo, useState } from "react";
import GenreSelection from "./GenreSelection";
import InstrumentSelection from "./InstrumentSelection";
import SettingPrice from "./SettingPrice";
import SheetPostDescription from "./SheetPostDescription";
import OrganizationSelection from "./OrganizationSelection";

import { UserContext } from "../User-context";
import LyricsSelection from "./LyricsSelection";
import DifficultySelection from "./DifficultySelection";
import UploadFileForm from "./UploadFileForm";

import Navigator from "../Navigator";
import { Alert, Button } from "react-bootstrap";
import CustomAlert from "../CustomAlert";
import { UploadSheetInfo, UploadFile } from "../AxiosUtil";
import { sheetInfoValidator } from "./SheetInfoValidator";
import { useNavigate } from "react-router";

function UploadSheet() {
  const [sheetInfo, setSheetInfo] = useState({
    title: "",
    content: "",
    price: 0,
    discountRate: 0,
    sheetDto: {
      title: "",
      pageNum: 0,
      difficulty: -1,
      instrument: -1,
      genres: [],
      isSolo: null,
      lyrics: null,
      filePath: "",
    },
  });

  const [sheetFile, setSheetFile] = useState([]);
  const [showAlert, setShowAlert] = useState({ state: false, text: "" });

  const context = useContext(UserContext);
  const navigate = useNavigate();
  const value = useMemo(
    () => ({ sheetInfo, setSheetInfo, sheetFile, setSheetFile }),
    [sheetInfo, setSheetInfo, sheetFile, setSheetFile]
  );

  useEffect(() => {
    if (showAlert.state) {
      setTimeout(() => {
        setShowAlert({ state: false, text: "" });
      }, 3000);
    }
  }, [showAlert]);
  const submitSheetPost = async () => {
    // send sheet data
    console.log("value:", value.sheetInfo);
    const flag = sheetInfoValidator(value.sheetInfo, setShowAlert);
    console.log("flag:", flag);
    if (flag === false) {
      return;
    }

    setGenre();

    let result = await UploadSheetInfo(context, value, setShowAlert);
  };

  return (
    <div className="d-flex flex-column">
      <Navigator />
      {showAlert.state ? (
        <CustomAlert variant={"danger"} value={{ showAlert, setShowAlert }} />
      ) : null}
      <div className="sheet-upload d-flex flex-column align-items-center align-self-center w-50 mt-3">
        <h3>악보 게시판 업로드</h3>
        <SettingPrice
          sheetInfo={value.sheetInfo}
          setSheetInfo={value.setSheetInfo}
        />

        <div className="sheet-upload-file">
          <UploadFileForm value={value} />
        </div>

        <SheetPostDescription
          sheetInfo={value.sheetInfo}
          setSheetInfo={value.setSheetInfo}
        />

        <GenreSelection value={value} />
        <InstrumentSelection setSheetInfo={value.setSheetInfo} />
        <OrganizationSelection setSheetInfo={value.setSheetInfo} />
        <LyricsSelection setSheetInfo={value.setSheetInfo} />
        <DifficultySelection setSheetInfo={value.setSheetInfo} />

        <div className="m-2">
          <button
            type="button"
            onClick={submitSheetPost}
            className="btn btn-danger"
          >
            작성
          </button>
          <Button
            onClick={() => {
              navigate("/main");
            }}
            className="btn-secondary m-2"
          >
            돌아가기
          </Button>
        </div>
      </div>
    </div>
  );

  function setGenre() {
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        genres: {
          genre1: value.sheetInfo.sheetDto.genres[0],
          genre2:
            value.sheetInfo.sheetDto.genres.length > 1
              ? value.sheetInfo.sheetDto.genres[1]
              : null,
        },
      },
    }));
  }
}
export default UploadSheet;
