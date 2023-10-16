import {
  Button,
  Col,
  Dropdown,
  ListGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import UserInfo from "./UserInfo";
import styles from "../css/Navigator.module.scss";
import { useContext, useState } from "react";
import { UserContext } from "./User-context";
import { useNavigate } from "react-router";
import Login from "./Login";
import CustomToggle from "./navs/CustomNavToggle";
import { Logout } from "./AxiosUtil";

function Navigator() {
  const context = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const changeSearchResult = (e) => {
    setSearchResult(e.target.value);
  };
  const navigate = useNavigate();

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="bg-body-tertiary border-bottom border-5"
      bg="light"
      data-bs-theme="light"
      style={{ height: "70px" }}
    >
      <Row className="d-inline-flex justify-content-between align-items-center w-100 ">
        <Col xs={3} className="d-inline-flex align-items-center">
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
        </Col>
        <Col xs={6} style={{ position: "relative" }}>
          <Row> </Row>
          <Row
            className="w-100"
            style={{
              position: "absolute",
            }}
            hidden={!focus}
          >
            <ListGroup className={`${styles["list-group"]}`}>
              <ListGroup.Item>결과 1</ListGroup.Item>
              <ListGroup.Item>결과 2</ListGroup.Item>
              <ListGroup.Item>결과 3</ListGroup.Item>
              <ListGroup.Item>결과 4</ListGroup.Item>
              <ListGroup.Item>결과 5</ListGroup.Item>
              <ListGroup.Item>결과 6</ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>

        <Col
          xs={3}
          className="d-inline-flex justify-content-end align-items-center"
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
            <Navbar.Brand>
              <Dropdown align={"end"}>
                <Dropdown.Toggle as={CustomToggle}>
                  <UserInfo />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="aa">유저 정보</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      Logout(context);
                      setClickLogin(false);
                    }}
                  >
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
