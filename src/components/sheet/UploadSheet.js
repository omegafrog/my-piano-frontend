import { useContext, useEffect, useMemo, useState } from "react";
import GenreSelection from "./GenreSelection";
import InstrumentSelection from "./InstrumentSelection";
import SettingPrice from "./SettingPrice";
import SheetPostDescription from "./SheetPostDescription";
import OrganizationSelection from "./OrganizationSelection";
import axios from "axios";
import { UserContext } from "../User-context";
import LyricsSelection from "./LyricsSelection";
import DifficultySelection from "./DifficultySelection";
import UploadFile from "./UploadFile";
import { decodeToken } from "react-jwt";

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

  const [sheetFileForm, setSheetFileForm] = useState([]);

  const context = useContext(UserContext);

  const value = useMemo(
    () => ({ sheetInfo, setSheetInfo, sheetFileForm, setSheetFileForm }),
    [sheetInfo, setSheetInfo, sheetFileForm, setSheetFileForm]
  );

  const validateToken = async () => {
    const jwtSecret = process.env.REACT_APP_JWT_SECRET;
    const token = decodeToken(context.accessToken);
    if (Date.now() / 1000 >= token.exp) {
      console.log("revalidation is needed.");
      console.log("before", context.accessToken);
      const response = await axios.get("/api/user/login/invalidate", {
        headers: {
          Authorization: context.accessToken,
        },
      });
      const newToken = response.data.serializedData["access token"];
      context.setAccessToken(newToken);
      localStorage.setItem("userState", JSON.stringify(context));
      console.log("revalidation over.");
    } else {
      console.log("revalidation is not needed.");
    }
  };
  useEffect(() => {
    validateToken();
  }, []);
  const submitSheetPost = async () => {
    // send sheet data
    if (value.sheetInfo.title.length < 3) {
      alert("글 제목이 너무 짧습니다.");
      return;
    }
    if (value.sheetInfo["content"].length < 10) {
      alert("글 내용이 너무 짧습니다.");
      return;
    }
    if (value.sheetInfo["price"] === null || value.sheetInfo["price"] < 0) {
      alert("금액은 0원 이하일 수 없습니다.");
      return;
    }
    console.log(value.sheetInfo.sheetDto);
    if (
      value.sheetInfo.sheetDto.title === null ||
      value.sheetInfo["sheetDto"]["title"].length < 3
    ) {
      alert("곡 제목이 너무 짧습니다.");
      return;
    }
    if (
      value.sheetInfo.sheetDto.pageNum === null ||
      value.sheetInfo.sheetDto.pageNum <= 0
    ) {
      alert("악보 페이지가 잘못되었습니다.");
      return;
    }
    if (
      value.sheetInfo.sheetDto.difficulty === null ||
      value.sheetInfo.sheetDto.difficulty < 0 ||
      value.sheetInfo.sheetDto.difficulty > 4
    ) {
      alert("난이도가 잘못되었습니다.");
      return;
    }
    if (
      value.sheetInfo.sheetDto.instrument === null ||
      value.sheetInfo.sheetDto.instrument < 0 ||
      value.sheetInfo.sheetDto.instrument > 12
    ) {
      alert("악기 선택이 잘못되었습니다.");
      return;
    }
    if (
      value.sheetInfo.sheetDto.genres === null ||
      value.sheetInfo.sheetDto.genres.length == 0 ||
      value.sheetInfo.sheetDto.genres.length > 2
    ) {
      alert("장르 선택이 잘못되었습니다.");
      return;
    }
    if (value.sheetInfo.sheetDto.isSolo === null) {
      alert("편성을 선택하지 않았습니다.");
      return;
    }
    if (value.sheetInfo.sheetDto.lyrics === null) {
      alert("가사 여부를 선택하지 않았습니다.");
      return;
    }
    if (
      value.sheetInfo.sheetDto.filePath === null ||
      value.sheetInfo.sheetDto.filePath.length === 0
    ) {
      alert("악보를 올리지 않았습니다.");
      return;
    }

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

    console.log("sheetInfo:", sheetInfo);
    const result = await axios.post("/api/sheet/write", value.sheetInfo, {
      headers: {
        Authorization: context.accessToken,
      },
    });
    console.log(result);
    if (result.data.status !== 200) {
      alert(result.data.message);
      if (result.data.status === 401) {
        const response = await axios.get("/api/user/login/invalidate", {
          headers: {
            Authorization: context.accessToken,
          },
        });
        console.log(context);
        const newToken = response.data.serializedData["access token"];
        context.setAccessToken(newToken);
      }
    }
    const fileResult = await axios({
      method: "post",
      url: "/api/sheet/file",
      withCredentials: true,
      headers: {
        Authorization: context.accessToken,
      },
      data: value.sheetFileForm,
    });
    console.log(fileResult);
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
        <UploadFile value={value} />
      </div>
      <SheetPostDescription
        sheetInfo={value.sheetInfo}
        setSheetInfo={value.setSheetInfo}
      />
      <GenreSelection value={value} />
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
