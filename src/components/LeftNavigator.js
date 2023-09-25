import { Col, Nav, Navbar, Row } from "react-bootstrap";

function LeftNavigator() {
  return (
    <Navbar
      style={{ width: "15%" }}
      className="align-items-start p-2 text-center border border-right"
    >
      <Col>
        <Row className="d-inline-flex">
          <Col className="w-33 d-flex justify-content-around">
            <Nav.Link href="/sheet/upload">
              악보 <br />
              업로드
            </Nav.Link>
          </Col>
          <Col className="w-33">
            <Nav.Link>
              스크랩한 <br />
              악보
            </Nav.Link>
          </Col>
          <Col className="w-33">
            <Nav.Link>
              좋아요 <br />
              누른 악보
            </Nav.Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Brand>내가 쓴 커뮤니티 글</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Brand>구매한 레슨</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Brand>내가 쓴 댓글</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Brand>구매한 악보</Navbar.Brand>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar.Brand>팔로우한 사람</Navbar.Brand>
          </Col>
        </Row>
      </Col>
    </Navbar>
  );
}
export default LeftNavigator;
