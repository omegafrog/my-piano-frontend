import { Navigate, useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import axios from "axios";
import Layout from "../Layout";

import revalidate from "../../util/revalidate";
import useAlert from "../../hook/useAlert";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import LikeBtn from "../LikeBtn";
import ScrapBtn from "../ScrapBtn";
import Metadata from "./Metadata";
import PaymentModal from "../PaymentModal";

function SheetContent({ item }) {
  console.log(item);
  let filePaths = item.sheet.sheetUrl.split(",");
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;
  filePaths.map((file, idx) => {
    filePaths[idx] = `https://${bucketName}.s3.${region}.amazonaws.com/${file}`;
  });
  filePaths.pop();

  return (
    <Carousel className="d-flex align-items-center">
      {filePaths.map((file, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100" src={file} alt="Second slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function Comment({ item }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(item.comments);
  const context = useContext(UserContext);
  const removeComment = async (event) => {
    const commentDiv = event.target.parentElement;

    const { accessToken, error } = revalidate(context);

    const response = await axios.delete(
      `http://localhost:8080/sheet/${item.id}/comment/${commentDiv.id}`,
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
      `http://localhost:8080/sheet/${item.id}/comment`,
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
              <Row>
                <Col xs={"auto"} style={{ paddingRight: "0px" }}>
                  <Image
                    className="sm"
                    src={item.artist.profileSrc}
                    roundedCircle
                    style={{ width: "30px", height: "auto" }}
                  />
                </Col>
                <Col style={{ paddingLeft: "3px" }}>
                  <span className="user-name" style={{ fontSize: "20px" }}>
                    {item.artist.name}
                  </span>
                </Col>
              </Row>
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

function SheetInfo() {
  const { id } = useParams();
  const context = useContext(UserContext);

  const [sheetPost, setSheetPost] = useState();
  const alertValue = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/sheet/${id}`).then((response) => {
      if (response.data.status === 200) {
        setSheetPost(response.data.serializedData.sheetPost);
        if (context.loggedIn === true) {
          const response = revalidate(context) || {};
          const { accessToken, error } = response;
          if (accessToken) {
            axios
              .get(`http://localhost:8080/sheet/${id}/like`, {
                headers: {
                  Authorization: accessToken,
                },
              })
              .then((response) => {
                if (response.data.serializedData.isLikedPost === true) {
                  const likeBtn = document.querySelector("#like-count");
                  likeBtn.style.backgroundColor = "#74b9ff";
                }
              });
            axios
              .get(`http://localhost:8080/sheet/${id}/scrap`, {
                headers: {
                  Authorization: accessToken,
                },
              })
              .then((response) => {
                if (response.data.serializedData.isScrapped === true) {
                  const scrapBtn = document.querySelector("#scrap-btn");
                  scrapBtn.style.backgroundColor = "#74b9ff";
                  scrapBtn.innerHTML = "scrapped";
                }
              });
          }
        }
      } else {
        navigate("/404");
      }
    });
  }, []);

  if (sheetPost !== undefined) {
    return (
      <Layout alertValue={alertValue} leftNav={false}>
        <div className="w-75" style={{ margin: "0px auto", paddingTop: "5vh" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="sheet-info" id="title" style={{ fontSize: "40px" }}>
              {sheetPost.title}
            </div>

            <div className="sheet-info" id="author">
              <Row>
                <Col xs={"auto"} className="p-0">
                  <Image
                    className="sm"
                    src={sheetPost.artist.profileSrc}
                    roundedCircle
                    style={{ width: "30px", height: "auto" }}
                  />
                </Col>
                <Col className="">
                  <span className="user-name" style={{ fontSize: "20px" }}>
                    {sheetPost.artist.name}
                  </span>
                </Col>
              </Row>
              <Row>
                <div
                  className="sheet-info"
                  id="view-count"
                  style={{ textAlign: "end" }}
                >
                  조회수:{sheetPost.viewCount}
                </div>
              </Row>
            </div>
          </div>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <SheetContent item={sheetPost} />

              <div
                dangerouslySetInnerHTML={{ __html: sheetPost.content }}
                className="content align-self-start"
              />
            </Col>
            <Col xs={3} className="h-100">
              <PaymentModal item={sheetPost} target={"sheet"} />
              <Metadata item={sheetPost} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="sheet-info scrap like d-flex justify-content-between">
                <LikeBtn
                  target={"sheet"}
                  id={sheetPost.id}
                  value={[sheetPost, setSheetPost]}
                />
                <ScrapBtn target={"sheet"} id={sheetPost.id} />
              </div>
            </Col>
          </Row>
          <Row>
            <div className="sheet-info comment">
              <Comment item={sheetPost} />
            </div>
          </Row>
        </div>
      </Layout>
    );
  }
}
export default SheetInfo;
