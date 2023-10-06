import { Navigate, useLocation, useNavigate } from "react-router";
import Navigator from "../Navigator";
import { Button, Row } from "react-bootstrap";

export default function RegisterSuccessPage() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  return (
    <div>
      <Navigator />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-50 align-self-center d-flex justify-content-center">
          <div className="d-flex align-items-center flex-column">
            <Row>
              <h1>회원가입 성공!</h1>
            </Row>
            <Row>
              <h3>환영합니다. {state}님.</h3>
            </Row>
            <Button
              onClick={() => {
                navigate("/main");
              }}
            >
              홈으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
