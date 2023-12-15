import { useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import axios from "axios";
import Layout from "../Layout";

import revalidate from "../../util/revalidate";
import useAlert from "../../hook/useAlert";
import { Col, Image, Row } from "react-bootstrap";
import LikeBtn from "../LikeBtn";
import ScrapBtn from "../ScrapBtn";
import Metadata from "./Metadata";
import PaymentModal from "../PaymentModal";
import Comment from "../comment/Comment";
import CartBtn from "../CartBtn";

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
              <CartBtn item={sheetPost} alertValue={alertValue} />
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
              <Comment item={sheetPost} target={"sheet"} />
            </div>
          </Row>
        </div>
      </Layout>
    );
  }
}
export default SheetInfo;
