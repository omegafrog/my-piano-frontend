import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import UserInfo from "./UserInfo";
import styles from "../css/Navigator.module.css";
import { useContext, useState } from "react";
import { UserContext } from "./User-context";
import { useNavigate } from "react-router";
import Login from "./Login";

function Navigator() {
  const context = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary border-bottom border-5"
      bg="light"
      data-bs-theme="light"
    >
      <Row className="d-inline-flex justify-content-between align-items-center w-100 ">
        <Col xs={9} className="d-inline-flex align-items-center">
          <Navbar.Brand href={"/main"}>
            <LogoBtn />
          </Navbar.Brand>
          <Navbar.Brand href="/sheet">
            <span>악보</span>
          </Navbar.Brand>
          <Navbar.Brand href="/sheet">
            <span>레슨</span>
          </Navbar.Brand>
          <Navbar.Brand href="/sheet">
            <span>커뮤니티</span>
          </Navbar.Brand>
          <Form className="w-100">
            <Col>
              <Form.Control size="lg" type="text" placeholder="Search" />
            </Col>
          </Form>
        </Col>

        <Col
          xs="auto"
          className="d-inline-flex justify-content-around align-items-center"
        >
          <Navbar.Brand href="a">
            <NavigationBtn img={"/img/coin-stack.png"} />
          </Navbar.Brand>
          <Navbar.Brand href="b">
            <NavigationBtn img={"/img/notification.png"} />
          </Navbar.Brand>
          <Navbar.Brand href="c">
            <NavigationBtn img={"/img/shopping-cart.png"} />
          </Navbar.Brand>
          {context.loggedIn ? (
            <Navbar.Brand href="d">
              <UserInfo />
            </Navbar.Brand>
          ) : (
            <div className="d-flex justify-content">
              <Button variant="light" onClick={(e) => setClickLogin(true)}>
                로그인
              </Button>
              <Login
                show={clickLogin}
                handleClose={(e) => setClickLogin(false)}
              />
              <Button
                variant="light"
                onClick={(e) => navigate("/user/register")}
              >
                회원가입
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {/* <NavigationBtn text={"레슨"} />
      <NavigationBtn text={"커뮤니티"} />
      <SearchBar /> */}
    </Navbar>
  );
}
export default Navigator;
