import { useNavigate, useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import axios from "axios";
import Layout from "../Layout";

import revalidate, { LoginError } from "../../util/revalidate";

import { Button, Col, Container, Image, Row } from "react-bootstrap";
import LikeBtn from "../LikeBtn";
import ScrapBtn from "../ScrapBtn";
import Metadata from "./Metadata";
import PaymentModal from "../PaymentModal";
import Comment from "../comment/Comment";
import CartBtn from "../CartBtn";
import { AlertContext } from "../../context/AlertContext";
import {
  deletePostAdmin,
  deleteSheetPostAdmin,
  getSheet,
  isLikedPost,
  isScrapped,
  updatePostAdmin,
  updateSheetPostAdmin,
} from "../AxiosUtil";
import $ from "jquery";
function SheetContent({ item }) {
  console.log(item);
  let filePaths = item.sheet.sheetUrl.split(".");
  const thumbnails = [];
  for (let i = 0; i < item.sheet.pageNum; i += 1) {
    thumbnails.push(
      `https://mypianobucket.s3.ap-northeast-2.amazonaws.com/${filePaths[0]}-${i}.jpg`
    );
  }
  console.log("thumbnails:", thumbnails);
  return (
    <div style={{ maxWidth: "350px" }}>
      <Carousel
        data-bs-theme="dark"
        className="d-flex align-items-center"
        interval={null}
      >
        {thumbnails.map((item, idx) => {
          return (
            <Carousel.Item>
              <Image
                style={{ objectFit: "contain", width: "100%" }}
                src={item}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
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
              {context.loggedUser.role === "ADMIN" ? (
                <>
                  <Button
                    className="mx-1"
                    variant="danger"
                    onClick={async () => {
                      try {
                        if (window.confirm("삭제하시겠습니까?")) {
                          await deleteSheetPostAdmin(context, id);
                          alert("삭제되었습니다.");
                          navigate("/admin/sheets");
                        }
                      } catch (e) {
                        console.error(e);
                        if (e instanceof LoginError) {
                          alert("로그인이 필요합니다.");
                          context.initialize();
                          navigate("/admin/login");
                        }
                      }
                    }}
                  >
                    삭제
                  </Button>
                  <Button
                    className="mx-1"
                    variant="danger"
                    id="disable"
                    onClick={async () => {
                      try {
                        const button = $("button#disable").get()[0];
                        button.classList.toggle("active");

                        //활성화 상태라면
                        if (button.classList.contains("active")) {
                          button.innerHTML = "비공개 됨";
                          await updateSheetPostAdmin(context, id, {
                            disable: true,
                          });
                        } else {
                          button.innerHTML = "공개 됨";
                          await updateSheetPostAdmin(context, id, {
                            disable: false,
                          });
                        }
                      } catch (e) {
                        if (e instanceof LoginError) {
                          console.error(e);
                          alert("로그인이 필요합니다.");
                          context.initialize();
                          navigate("/admin/login");
                        }
                      }
                    }}
                  >
                    {sheetPost.disabled === true ? "비공개 됨" : "공개됨"}
                  </Button>
                </>
              ) : null}
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
