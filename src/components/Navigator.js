import {
  Button,
  Col,
  Dropdown,
  Form,
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
import axios from "axios";
import https from "https";

function Navigator() {
  const context = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const changeSearchResult = async (e) => {
    setSearchResult(e.target.value);
    if (searchResult.length >= 2) {
      const esBody = {
        query: {
          query_string: {
            query: e.target.value,
          },
        },
      };

      const esHost = process.env.REACT_APP_ELASTIC_HOSTNAME;
      const esPort = process.env.REACT_APP_ELASTIC_PORT;
      const esSecret = process.env.REACT_APP_ELASTIC_SECRET;
      console.log("url:", `https://${esHost}:${esPort}/*/_search`);
      const result = await axios({
        method: "get",
        
        validateStatus: false,
        withCredentials: true,
        headers: {
          Authorization: `Basic ${esSecret}`,
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        data: esBody,
      }).catch(function (error) {
        console.log(error);
      });
      console.log("searchResult:", result);
    }
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
        <Col xs={5} style={{ position: "relative" }}>
          <Row>
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={changeSearchResult}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => setFocus(false)}
              value={searchResult}
            />
          </Row>
          <Row
            className="w-100"
            style={{
              position: "absolute",
            }}
            hidden={!focus}
          >
            <ListGroup className={`w-100 ${styles["list-group"]}`}>
              <ListGroup.Item className="w-100">결과 1</ListGroup.Item>
              <ListGroup.Item className="w-100">결과 2</ListGroup.Item>
              <ListGroup.Item className="w-100">결과 3</ListGroup.Item>
              <ListGroup.Item className="w-100">결과 4</ListGroup.Item>
              <ListGroup.Item className="w-100">결과 5</ListGroup.Item>
              <ListGroup.Item className="w-100">결과 6</ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>

        <Col
          xs={2}
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
