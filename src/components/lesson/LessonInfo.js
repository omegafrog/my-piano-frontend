import { MDBContainer } from "mdb-react-ui-kit";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";
import { Route, useLocation, useNavigate, useParams } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  NavItem,
  Row,
} from "react-bootstrap";
import { UserInfo } from "../user/userInfo";
import axios from "axios";
import revalidate from "../../util/revalidate";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import VideoContainer from "./VideoContainer";
import ScrapBtn from "../ScrapBtn";
import LikeBtn from "../LikeBtn";
import PaymentModal from "../PaymentModal";

export default function LessonInfo() {
  const alertValue = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [lesson, setLesson] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/lesson/${id}`, {
        withCredentials: true,
        validateStatus: false,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setLesson(response.data.serializedData.lesson);
        }
      });
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
              <UserInfo
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
                  navigate(`/sheet/${lesson.sheet.id}`);
                }}
              >
                ▶️ 레슨에 사용된 악보 : {lesson.sheet.title}
              </Button>
            </Col>
          </Row>
          <Row className="py-5">
            <div className="sheet-info comment">
              <Comment item={lesson} target="lesson" />
            </div>
          </Row>
        </Container>
      ) : (
        <h2>loading</h2>
      )}
    </Layout>
  );
}

function Comment({ target, item }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(item.comments);
  const context = useContext(UserContext);
  const removeComment = async (event) => {
    const commentDiv = event.target.parentElement;

    const { accessToken, error } = revalidate(context);

    const response = await axios.delete(
      `http://localhost:8080/${target}/${item.id}/comment/${commentDiv.id}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    console.log(response);

    const removedCommentList = commentList.filter((comment) => {
      return comment.id !== parseInt(commentDiv.id);
    });
    setCommentList(removedCommentList);
  };
  const sendComment = async (event) => {
    console.log(context);
    const { accessToken, error } = revalidate(context);
    const response = await axios.post(
      `http://localhost:8080/${target}/${item.id}/comment`,
      { content: comment },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    console.log(response);
    if (response.data.status === 200) {
      setCommentList(response.data.serializedData.comments);
    }
  };

  return (
    <div className="comment form">
      <h2>댓글 {commentList.length}건</h2>
      <hr />
      <div className="input d-flex">
        <Col className="m-1">
          <Form.Control
            as={"textarea"}
            rows={2}
            placeholder="댓글을 작성하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ resize: "none" }}
          />
        </Col>
        <Col xs={"auto"} className="m-1">
          <Button className="h-100" onClick={sendComment}>
            댓글 쓰기
          </Button>
        </Col>
      </div>
      <div className="comments">
        {commentList.map((comment, idx) => (
          <div className="comment m-3" key={comment.id} id={comment.id}>
            <div className="sheet-info" id="author">
              <UserInfo
                profileSrc={comment.author.profileSrc}
                name={comment.author.name}
              />
            </div>
            <div className="sheet-info content">{comment.content}</div>
            <Button size="sm" className="m-1">
              답글
            </Button>
            <Button
              size="sm"
              className="m-1"
              variant="danger"
              onClick={removeComment}
            >
              삭제
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
