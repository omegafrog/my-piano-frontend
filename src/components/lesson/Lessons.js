import { useEffect, useState } from "react";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";
import axios from "axios";
import { Card, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Lessons() {
  const alertValue = useAlert();
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/lessons", {
        withCredentials: true,
        validateStatus: false,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setLessonList(response.data.serializedData.lessons);
        }
      });
  }, []);

  return (
    <Layout leftNav={true} alertValue={alertValue}>
      <Container className="w-75" style={{ paddingTop: "30px" }}>
        <div
          style={{
            height: "200px",
            border: "1px solid blue",
            marginBottom: "30px",
          }}
        >
          배너
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
