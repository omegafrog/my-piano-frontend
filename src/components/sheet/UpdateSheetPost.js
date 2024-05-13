import { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import LeftNavigator from "../LeftNavigator";
import { AlertContext } from "../../context/AlertContext";
import SettingPrice from "./SettingPrice";
import UploadFileForm from "./UploadFileForm";
import SheetPostDescription from "./SheetPostDescription";
import GenreSelection from "./GenreSelection";
import InstrumentSelection from "./InstrumentSelection";
import OrganizationSelection from "./OrganizationSelection";
import LyricsSelection from "./LyricsSelection";
import DifficultySelection from "./DifficultySelection";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router";
import { deleteSheetPost, getSheet, updateSheetPost } from "../AxiosUtil";
import { UserContext } from "../../context/User-context";
import { LoginError } from "../../util/revalidate";

export default function UpdateSheetPost() {
  const alertValue = useContext(AlertContext);
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [sheetFile, setSheetFile] = useState();
  const [sheetInfo, setSheetInfo] = useState();
  useEffect(() => {
    async function invoke() {
      try {
        const data = await getSheet(id);
        console.log(data);
        setSheetInfo(data);
        setLoading(true);
      } catch (e) {
        if (e instanceof LoginError) {
          alert("로그인이 필요합니다");
          navigate("main");
        } else {
          alert("잘못된 접근입니다");
          navigate("/sheets");
        }
      }
    }
    invoke();
  }, []);

  return (
    <Layout alertValue={alertValue}>
      <div className="d-flex flex-column align-items-center w-100">
        <h3>글 수정</h3>
        {loading === true ? (
          <>
            <SettingPrice sheetInfo={sheetInfo} setSheetInfo={setSheetInfo} />

            <div className="sheet-upload-file">
              <UploadFileForm
                setSheetFile={setSheetFile}
                setSheetInfo={setSheetInfo}
              />
            </div>

            <SheetPostDescription
              sheetInfo={sheetInfo}
              setSheetInfo={setSheetInfo}
            />

            <GenreSelection sheetInfo={sheetInfo} setSheetInfo={setSheetInfo} />
            <InstrumentSelection
              sheetInfo={sheetInfo}
              setSheetInfo={setSheetInfo}
            />
            <OrganizationSelection
              sheetInfo={sheetInfo}
              setSheetInfo={setSheetInfo}
            />
            <LyricsSelection setSheetInfo={setSheetInfo} />
            <DifficultySelection setSheetInfo={setSheetInfo} />

            <div className="m-2">
              <button
                type="button"
                onClick={async () => {
                  const formdata = new FormData();
                  console.log(sheetFile);
                  console.log(sheetInfo);
                  formdata.append("file", sheetFile);
                  formdata.append("dto", JSON.stringify(sheetInfo));
                  await updateSheetPost(context, id, formdata);
                  navigate("/sheets");
                }}
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
              {context.loggedUser.role === "CREATOR" &&
              context.loggedUser.id === sheetInfo.artist.id ? (
                <Button
                  variant={"danger"}
                  onClick={async () => {
                    try {
                      await deleteSheetPost(context, id);
                      navigate("/sheets");
                    } catch (e) {
                      if (e instanceof LoginError) {
                        alert("인증이 필요합니다.");
                        context.initialize();
                        navigate("/login");
                      } else {
                        alertValue.alert("danger", "삭제 실패");
                      }
                    }
                  }}
                >
                  삭제
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    </Layout>
  );
}
