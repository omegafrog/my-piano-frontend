import { useContext, useEffect, useState } from "react";

import Layout from "../Layout";
import { UserContext } from "../../context/User-context";
import { useNavigate } from "react-router";
import axios from "axios";
import revalidate from "../../util/revalidate";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { AlertContext } from "../../context/AlertContext";

export default function ScrappedSheetList() {
  const alertValue = useContext(AlertContext);
  const [scrappedSheet, setScrappedSheet] = useState([]);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    if (context.loggedIn === true) {
      const result = revalidate(context) || {};
      const { accessToken, error } = result;
      axios
        .get("http://localhost:8080/user/scrappedSheets", {
          headers: {
            Authorization: accessToken,
          },
          withCredentials: true,
          validateStatus: false,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setScrappedSheet(response.data.data.sheets);
          }
        });
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/main");
    }
  }, []);
  return (
    <Layout leftNav={true} alertValue={alertValue}>
      <Container fluid className="m-2">
        <Row>
          <h1>스크랩한 악보</h1>
        </Row>
        <Row>
          {scrappedSheet.map((item, index) => {
            return (
              <Card
                style={{ width: "15rem", cursor: "pointer" }}
                onClick={() => {
                  window.location.href = `/sheet/${item.id}`;
                }}
              >
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <div className="sheet-info" id="author">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content }}
                        className="content align-self-start"
                      />
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col xs={"auto"} className="p-0">
                      <Image
                        className="sm"
                        src={item.artist.profileSrc}
                        roundedCircle
                        style={{ width: "30px", height: "auto" }}
                      />
                    </Col>
                    <Col className="p-0">
                      <span className="user-name" style={{ fontSize: "20px" }}>
                        {item.artist.name}
                      </span>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}
