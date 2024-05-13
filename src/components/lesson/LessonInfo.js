import Layout from "../Layout";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ItemListUserInfo } from "../user/userInfo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User-context";
import VideoContainer from "./VideoContainer";
import ScrapBtn from "../ScrapBtn";
import LikeBtn from "../LikeBtn";
import PaymentModal from "../PaymentModal";
import { getLesson } from "../AxiosUtil";
import Comment from "../comment/Comment";
import { AlertContext } from "../../context/AlertContext";

export default function LessonInfo() {
  const alertValue = useContext(AlertContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [lesson, setLesson] = useState();

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getLesson(id);
        setLesson(data.lesson);
      } catch (e) {
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
  }, []);
  return (
    <Layout alertValue={alertValue}>
      {lesson ? (
        <Container className="w-75 ">
          <div className="d-flex justify-content-between align-items-center py-2">
            <div
              className="lesson-info"
              id="title"
              style={{ fontSize: "40px" }}
            >
              {lesson.title}
            </div>
            <div>
              <ItemListUserInfo
                profileSrc={lesson.artist.profileSrc}
                name={lesson.artist.name}
              />
            </div>
          </div>
          <Row>
            <Col>
              <VideoContainer videoUrl={lesson.videoInformation.videoUrl} />
              <div className="pt-5">
                <h3>크리에이터 설명</h3>
                {lesson.lessonInformation.artistDescription}
              </div>
              <div className="pt-3">
                <h3>레슨 설명</h3>
                {lesson.lessonInformation.lessonDescription}
              </div>
              <div className="pt-3">
                <h3>환불 정책</h3>
                {lesson.lessonInformation.policy}
              </div>
            </Col>
            <Col xs={3} className="mx-3 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <h3>{lesson.price}원</h3>
                <div>
                  <ScrapBtn target={"lesson"} id={lesson.id} className="mx-2" />
                  <LikeBtn
                    id={lesson.id}
                    target={"lesson"}
                    value={[lesson, setLesson]}
                  />
                </div>
              </div>

              <PaymentModal item={lesson} target={"lesson"} />
              <div className="my-3">
                <Row className="my-2">
                  <Col>
                    <span>카테고리</span>
                  </Col>
                  <Col>
                    <span>악기</span>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col>
                    <span>{lesson.lessonInformation.category}</span>
                  </Col>
                  <Col>
                    <span>{lesson.lessonInformation.instrument}</span>
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col>
                    <span>재생 시간</span>
                  </Col>
                  <Col className="d-flex justify-content-center"></Col>
                </Row>
              </div>
              <Button
                variant="outline-secondary"
                className="my-2 p-2 w-100 d-flex"
                onClick={() => {
                  navigate(`/sheet/${lesson.sheetPostId}`);
                }}
              >
                ▶️ 레슨에 사용된 악보 : {lesson.sheet.title}
              </Button>
            </Col>
          </Row>
          <Row className="py-5">
            <div className="sheet-info">
              <Comment target="lesson" />
            </div>
          </Row>
        </Container>
      ) : (
        <h2>loading</h2>
      )}
    </Layout>
  );
}
