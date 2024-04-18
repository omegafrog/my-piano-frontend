import { useContext, useEffect, useState } from "react";

import Layout from "../Layout";
import axios from "axios";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AlertContext } from "../../context/AlertContext";
import { getLessons } from "../AxiosUtil";
import LeftNavigator from "../LeftNavigator";

export default function Lessons() {
  const alertValue = useContext(AlertContext);
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    async function invoke() {
      await getLessons();
    }
    invoke();
  }, []);

  return (
    <Layout leftNav={<LeftNavigator />} alertValue={alertValue}>
      <Container className="w-75" style={{ paddingTop: "30px" }}>
        <div
          style={{
            height: "200px",
            marginBottom: "30px",
            backgroundColor: "#F9EBDE",
          }}
          className="d-flex  align-items-center"
        >
          <div style={{ paddingLeft: "70px" }}>
            <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
              마이 피아노 레슨
            </span>
            <br />
            <span style={{ fontSize: "1.4rem", color: "#815854" }}>
              레슨과 함께 쉽게 완성하는 한 곡!
            </span>
          </div>
        </div>
        <LessonList lessons={lessonList}></LessonList>
      </Container>
    </Layout>
  );
}

function LessonList({ lessons }) {
  const naviagate = useNavigate();
  if (lessons.length > 0) {
    return (
      <div className="w-100">
        {lessons.map((item, idx) => {
          const videoUrl = item.videoInformation.videoUrl.split("/");
          const videoId = videoUrl[videoUrl.length - 1];
          return (
            <Card
              style={{ width: "300px", height: "auto", cursor: "pointer" }}
              key={idx}
              onClick={(e) => {
                naviagate(`/lesson/${item.id}`, { state: item });
              }}
            >
              <Card.Img
                src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg`}
              ></Card.Img>
              <Card.Body>
                <div>
                  <Row>
                    <Col xs={"auto"} style={{ paddingRight: "0px" }}>
                      <Image
                        className="sm"
                        src={item.artist.profileSrc}
                        roundedCircle
                        style={{ width: "30px", height: "auto" }}
                      />
                    </Col>

                    <Col
                      xs={"auto"}
                      style={{ paddingLeft: "5px" }}
                      className="d-flex align-items-center"
                    >
                      <span style={{ textAlign: "baseline" }}>
                        {item.artist.name}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <span>{item.title}</span>
                  </Row>
                  <Row>
                    <span>{item.price}원</span>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  } else {
    return <h1>아직 올린 악보가 없습니다.</h1>;
  }
}
