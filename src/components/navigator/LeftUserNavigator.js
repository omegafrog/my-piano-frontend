import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";
import ChangeUserInfo from "./ChangeUserInput";
import { useEffect } from "react";
export default function LeftUserNavigator({ pageRef }) {
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        position: "sticky",
        top: "70px",
      }}
      className=" border border-right"
    >
      <Container>
        <Row
          className={"py-2"}
          style={{ borderBottom: "1px solid #bdc3c7" }}
          onClick={() => {
            console.log("clicked");
            console.log(pageRef.current);
            ReactDOM.render(<ChangeUserInfo />, pageRef.current);
          }}
        >
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row className={"py-2"} style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row className={"py-2"} style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row className={"py-2"} style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row className={"py-2"} style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row className="py-2" style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>결제 내역 조회/환불</strong>
          </div>
        </Row>
        <Row className="py-2" style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>비밀번호 변경</strong>
          </div>
        </Row>
        <Row className="py-2" style={{ borderBottom: "1px solid #bdc3c7" }}>
          <div>
            <strong style={{ fontSize: "20px" }}>회원 탈퇴</strong>
          </div>
        </Row>
      </Container>
    </div>
  );
}
