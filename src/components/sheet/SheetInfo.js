import { useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import axios from "axios";
import Layout from "../Layout";

import revalidate from "../../util/revalidate";

import { Col, Image, Row } from "react-bootstrap";
import LikeBtn from "../LikeBtn";
import ScrapBtn from "../ScrapBtn";
import Metadata from "./Metadata";
import PaymentModal from "../PaymentModal";
import Comment from "../comment/Comment";
import CartBtn from "../CartBtn";
import { AlertContext } from "../../context/AlertContext";
import { getSheet, isLikedPost, isScrapped } from "../AxiosUtil";

function SheetContent({ item }) {
  console.log(item);
  let filePaths = item.sheet.sheetUrl.split(",");
  filePaths.pop();

  return (
    <Carousel
      className="d-flex align-items-center"
      style={{
        width: "700px",
        height: "1000px",
      }}
    >
      {filePaths.map((file, idx) => {
        const fileNameChunks = file.split(".");
        const extensions = fileNameChunks[fileNameChunks.length - 1];
        if (extensions === "pdf") {
          return (
            <Carousel.Item key={idx}>
              <embed
                className="d-block w-100 h-100"
                src={file}
                type={"application/pdf"}
                scrolling={"none"}
                alt="Second slide"
              />
            </Carousel.Item>
          );
        } else {
          return (
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={file} alt="Second slide" />
            </Carousel.Item>
          );
        }
      })}
    </Carousel>
  );
}
// TODO : 자신의 sheet일 경우 cart에 넣지 못하도록 비활성화
function SheetInfo() {
  const { id } = useParams();
  const context = useContext(UserContext);

  const [sheetPost, setSheetPost] = useState();
  const alertValue = useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getSheet(id);
        setSheetPost(data.sheetPost);
        const likedPostData = await isLikedPost(context, "sheet", id);
        if (likedPostData.isLikedPost === true) {
          const likeBtn = document.querySelector("#like-count");
          likeBtn.style.backgroundColor = "#74b9ff";
        }
        const isScrappedData = await isScrapped(context, "sheet", id);
        if (isScrappedData.isScrapped === true) {
          const scrapBtn = document.querySelector("#scrap-btn");
          scrapBtn.style.backgroundColor = "#74b9ff";
          scrapBtn.innerHTML = "scrapped";
        }
      } catch (e) {
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
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
