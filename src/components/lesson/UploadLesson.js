import Layout from "../Layout";

import { Button, Container, Form, Tab, Tabs } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../User-context";
import { useNavigate } from "react-router";
import revalidate from "../../util/revalidate";
import { MDBContainer } from "mdb-react-ui-kit";
import { AlertContext } from "../../context/AlertContext";
import { getUserUploadedSheets, uploadLesson } from "../AxiosUtil";

function CategoryInput({ value, setLessonInfo }) {
  const changeCategory = (event) => {
    setLessonInfo((prev) => ({
      ...prev,
      lessonInformation: {
        ...prev.lessonInformation,
        category: event.target.value,
      },
    }));
  };
  return (
    <input
      type="radio"
      name="category"
      value={value}
      id={`category${value}`}
      className="btn-check"
      onClick={changeCategory}
    />
  );
}

function InstrumentSelectionInput({ setLessonInfo, value, text }) {
  const changeInstrument = (event) => {
    setLessonInfo((prev) => ({
      ...prev,
      lessonInformation: {
        ...prev.lessonInformation,
        instrument: event.target.value,
      },
    }));
  };
  return (
    <div className="m-1">
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

export default function UploadLesson() {
  const alertValue = useContext(AlertContext);
  const [sheetList, setSheetList] = useState();
  const [loading, setLoading] = useState(true);
  const [videoURL, setVideoURL] = useState();
  const [embedVideoUrl, setEmbedVideoUrl] = useState();
  const [lessonInfo, setLessonInfo] = useState({
    title: "",
    subTitle: "",
    videoInformation: {
      videoUrl: "",
      runningTime: "",
    },
    lessonInformation: {
      artistDescription: "",
      lessonDescription: "",
      policy: 0,
      instrument: -1,
      category: -1,
    },
    price: 0,
    sheetId: -1,
  });
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(lessonInfo);
  }, [lessonInfo]);

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getUserUploadedSheets(context);
        console.log(data);
        setSheetList(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
  }, []);

  return (
    <Layout leftNav={false} alertValue={alertValue}>
      <Container fluid className="d-flex flex-column align-items-center">
        <div
          className="lesson-upload d-flex flex-column w-50"
          style={{ paddingTop: "30px", paddingBottom: "30px" }}
        >
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              value={lessonInfo.title}
            />
            <Form.Label>부제</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  subTitle: e.target.value,
                }));
              }}
              value={lessonInfo.subTitle}
            />
            <Form.Label>가격</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  price: e.target.value,
                }));
              }}
              value={lessonInfo.price}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>레슨할 곡을 선택하세요</Form.Label>
            <Form.Select
              onChange={(e) => {
                console.log(e.target.value);
                setLessonInfo((prev) => ({
                  ...prev,
                  sheetId: e.target.value,
                }));
              }}
            >
              <option>악보를 선택하세요</option>
              {loading === false
                ? sheetList.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.title}
                      </option>
                    );
                  })
                : null}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>레슨 동영상 URL</Form.Label>
            <Form.Control
              value={videoURL}
              onChange={(e) => {
                const list = e.target.value.match("(v=[^&\\s]+)");
                console.log("list:", list);
                console.log(e.target.value);
                if (list && list.length > 0) {
                  const id = list[0].substring(2);
                  setEmbedVideoUrl(`https://www.youtube.com/embed/${id}`);
                  setLessonInfo((prev) => ({
                    ...prev,
                    videoInformation: {
                      ...prev.videoInformation,
                      videoUrl: `https://www.youtube.com/embed/${id}`,
                    },
                  }));
                }
              }}
            ></Form.Control>
            <MDBContainer>
              <div className="ratio ratio-16x9">
                <iframe
                  src={embedVideoUrl}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            </MDBContainer>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>크리에이터 설명</Form.Label>
            <Form.Control
              as={"textarea"}
              style={{ resize: "none" }}
              placeholder="크리에이터에 대한 설명을 적어주세요."
              value={lessonInfo.lessonInformation.artistDescription}
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  lessonInformation: {
                    ...prev.lessonInformation,
                    artistDescription: e.target.value,
                  },
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>레슨 설명</Form.Label>
            <Form.Control
              as={"textarea"}
              style={{ resize: "none" }}
              value={lessonInfo.lessonInformation.lessonDescription}
              placeholder="레슨에 대한 설명을 적어주세요."
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  lessonInformation: {
                    ...prev.lessonInformation,
                    lessonDescription: e.target.value,
                  },
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>환불 정책</Form.Label>
            <Form.Select
              onChange={(e) => {
                setLessonInfo((prev) => ({
                  ...prev,
                  lessonInformation: {
                    ...prev.lessonInformation,
                    policy: e.target.value,
                  },
                }));
              }}
            >
              <option value={0}>7일 이내</option>
              <option value={1}>15일 이내</option>
              <option value={2}>30일 이내</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>악기</Form.Label>
            <div className="w-100">
              <Tabs defaultActiveKey="piano" className="mb-3">
                <Tab eventKey="piano" title="피아노">
                  <div className="d-flex">
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={0}
                      text={"피아노 88키"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={1}
                      text={"피아노 61키"}
                    />
                  </div>
                </Tab>
                <Tab eventKey="guitar" title="기타">
                  <div className="d-flex">
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={2}
                      text={"어쿠스틱"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={3}
                      text={"일렉트릭"}
                    />
                  </div>
                </Tab>
                <Tab eventKey="string" title="현악기">
                  <div className="d-flex">
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={4}
                      text={"베이스"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={5}
                      text={"우쿨렐레"}
                    />
                  </div>
                </Tab>
                <Tab eventKey={"wooden"} title="목관악기">
                  <div className="d-flex">
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={6}
                      text={"바이올린"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={7}
                      text={"비올라"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={8}
                      text={"첼로"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={9}
                      text={"베이스"}
                    />
                  </div>
                </Tab>
                <Tab eventKey={"steel"} title="금관악기">
                  <div className="d-flex">
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={10}
                      text={"플루트"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={11}
                      text={"피콜로"}
                    />
                    <InstrumentSelectionInput
                      setLessonInfo={setLessonInfo}
                      value={12}
                      text={"오보에"}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>카테고리</Form.Label>
            <div className="w-100">
              <div className="btn-group" role="group" aria-label="Category">
                <CategoryInput setLessonInfo={setLessonInfo} value={0} />
                <label htmlFor="category0" className="btn btn-primary">
                  한곡 완성법
                </label>
                <CategoryInput setLessonInfo={setLessonInfo} value={1} />
                <label htmlFor="category1" className="btn btn-primary">
                  반주법
                </label>
              </div>
            </div>
          </Form.Group>
          <Button
            className="m-2"
            onClick={async () => {
              try {
                await uploadLesson(context, lessonInfo);
                navigate("/lesson");
              } catch (e) {
                console.error(e);
                alertValue.alert("danger", e.message);
              }
            }}
          >
            {" "}
            등록
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
