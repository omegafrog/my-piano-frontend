import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function LeftUserNavigator() {
  const navigate = useNavigate();
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
            navigate("/user");
          }}
        >
          <div>
            <strong style={{ fontSize: "20px" }}>유저 정보 변경</strong>
          </div>
        </Row>
        <Row
          className="py-2"
          style={{ borderBottom: "1px solid #bdc3c7" }}
          onClick={() => {
            navigate("/user/cash");
          }}
        >
          <div>
            <strong style={{ fontSize: "20px" }}>
              현금 결제 내역 조회/환불
            </strong>
          </div>
        </Row>

        <Row
          className="py-2"
          style={{ borderBottom: "1px solid #bdc3c7" }}
          onClick={() => {
            navigate("/user/purchased");
          }}
        >
          <div>
            <strong style={{ fontSize: "20px" }}>구매 내역 조회/환불</strong>
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
