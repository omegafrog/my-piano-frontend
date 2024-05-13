import { useContext } from "react";
import { Accordion, Col, Nav, Navbar, Row } from "react-bootstrap";
import { UserContext } from "../context/User-context";

function LeftNavigator() {
  const context = useContext(UserContext);
  const userBtns = (
    <Row style={{ paddingTop: "10px" }} className="d-inline-flex ">
      <Col xs={"auto"}>
        <Nav.Link href="/sheet/scrapped">
          <span style={{ fontSize: "14px" }}>스크랩</span>
        </Nav.Link>
      </Col>
      <Col xs={"auto"}>
        <Nav.Link href={"/sheet/purchased"}>
          <span style={{ fontSize: "14px" }}>구매 악보</span>
        </Nav.Link>
      </Col>
      <Col xs={"auto"}>
        <Nav.Link href="/sheet/upload">
          <span style={{ fontSize: "14px" }}>업로드</span>
        </Nav.Link>
      </Col>
    </Row>
  );
  const creatorBtns = (
    <Row style={{ paddingTop: "10px" }} className="d-inline-flex m-2">
      <Col xs={"auto"}>
        <Nav.Link>내 레슨</Nav.Link>
      </Col>
      <Col xs={"auto"} className="d-flex justify-content-around">
        <Nav.Link href="/lesson/upload">레슨 업로드</Nav.Link>
      </Col>
    </Row>
  );
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        position: "sticky",
        top: "70px",
      }}
      className="text-center border border-right"
    >
      {userBtns}
      {context.loggedIn === true && context.loggedUser.role === "CREATOR"
        ? creatorBtns
        : null}

      <Row style={{ paddingTop: "10px" }}>
        <Navbar.Brand>마피아 차트</Navbar.Brand>
      </Row>
      <div style={{ paddingTop: "10px" }}>
        <Row>
          <span>악기</span>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey={0}>
              <Accordion.Header>피아노</Accordion.Header>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=PIANO_KEY_88"}>88키</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=PIANO_KEY_61"}>61키</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={1}>
              <Accordion.Header>기타</Accordion.Header>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=GUITAR_ACOUSTIC"}>어쿠스틱</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=GUITAR_ELECTRIC"}>일렉트릭</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=GUITAR_BASE"}>베이스</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=GUITAR_UKULELE"}>우쿨렐레</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={2}>
              <Accordion.Header>현악기</Accordion.Header>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=STRING_VIOLIN"}>바이올린</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=STRING_VIOLA"}>비올라</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=STRING_CELLO"}>첼로</a>
              </Accordion.Body>
              <Accordion.Body className="d-flex">
                <a href={"?instrument=STRING_BASE"}>베이스</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={3}>
              <Accordion.Header>목관악기</Accordion.Header>
              <Accordion.Body>
                <a href={"?instrument=WOODWIND_FLUTE"}>플루트</a>
              </Accordion.Body>
              <Accordion.Body>
                <a href={"?instrument=WOODWIND_PICCOLO"}>피콜로</a>
              </Accordion.Body>
              <Accordion.Body>
                <a href={"?instrument=WOODWIND_OBOE"}>오보에</a>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </div>
    </div>
  );
}
export default LeftNavigator;
