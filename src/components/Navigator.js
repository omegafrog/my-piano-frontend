import { Button, Col, Dropdown, Navbar, Row } from "react-bootstrap";
import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import UserInfo from "./UserInfo";
import { messaging } from "../firebase";

import { useContext, useMemo, useState } from "react";
import { UserContext } from "../context/User-context";
import { useNavigate } from "react-router";
import Login from "./Login";
import CustomToggle from "./navs/CustomNavToggle";
import { Logout, getNoti } from "./AxiosUtil";
import NavSearchRecommend from "./NavSearchRecommend";
import NavSearchBar from "./NavSearchBar";
import CashModal from "./cash/CashModal";
import { NotiContext } from "../context/NotiContext";
import { onMessage } from "firebase/messaging";
function Navigator() {
  const context = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);

  const [cashModalShow, setCashModalShow] = useState(false);
  const cashModalShowValue = useMemo(() => {
    return cashModalShow;
  }, [cashModalShow]);
  return (
    <>
      <CashModal
        cashModalShow={cashModalShowValue}
        setCashModalShow={setCashModalShow}
      />
      <Navbar
        sticky="top"
        expand="lg"
        className="bg-body-tertiary "
        bg="light"
        data-bs-theme="light"
        style={{ height: "70px" }}
      >
        <Row className="d-flex justify-content-between align-items-center w-100 ">
          <Col xs={"auto"} className="d-flex align-items-center">
            <NavLeftButtons />
          </Col>
          <Col>
            <SearchBar />
          </Col>
          <Col
            xs={"auto"}
            className="d-inline-flex justify-content-end align-items-center"
          >
            <NavRightButtons setCashModalShow={setCashModalShow} />
            {context.loggedIn ? (
              <UserInfoWhenLogin
                context={context}
                setClickLogin={setClickLogin}
              />
            ) : (
              <div className="d-flex justify-content">
                <UserInfoWhenNotLogin
                  setClickLogin={setClickLogin}
                  clickLogin={clickLogin}
                />
              </div>
            )}
          </Col>
        </Row>
      </Navbar>
    </>
  );
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [focus, setFocus] = useState(false);
  return (
    <>
      <NavSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        focus={focus}
        setFocus={setFocus}
      />
      <NavSearchRecommend focus={focus} searchResult={searchResult} />
    </>
  );
}
function NavLeftButtons() {
  return (
    <>
      <Navbar.Brand
        href={"/main"}
        style={{ width: "120px", marginRight: "30px" }}
      >
        <LogoBtn />
      </Navbar.Brand>
      <Navbar.Brand href="/sheet">
        <span>악보</span>
      </Navbar.Brand>
      <Navbar.Brand href="/lesson">
        <span>레슨</span>
      </Navbar.Brand>
      <Navbar.Brand href="/post">
        <span>커뮤니티</span>
      </Navbar.Brand>
    </>
  );
}
function NavRightButtons({ setCashModalShow }) {
  const context = useContext(UserContext);
  const notiContext = useContext(NotiContext);
  onMessage(messaging, (body) => {
    console.log(body);
    const notice = JSON.parse(body.data.body);
    notiContext.addNotificaiton(notice.body, notice.topic);
  });

  return (
    <>
      <Navbar.Brand
        onClick={() => {
          setCashModalShow(true);
          console.log("clicked");
        }}
      >
        <NavigationBtn img={"/img/coin-stack.png"} />
      </Navbar.Brand>
      <Navbar.Brand>
        <Dropdown
          onClick={async () => {
            const data = await getNoti(context);
            const notices = [];
            data.map((item, idx) =>
              notices.push({ id: item.id, body: item.body, topic: item.topic })
            );
            notiContext.setNotification(notices);
          }}
          align={"end"}
        >
          <Dropdown.Toggle as={CustomToggle}>
            <NavigationBtn img={"/img/notification.png"} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {notiContext.notices.map((item, idx) => {
              return <Dropdown.Item key={idx}>{item.body}</Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Brand>
      <Navbar.Brand href="/cart">
        <NavigationBtn img={"/img/shopping-cart.png"} />
      </Navbar.Brand>
    </>
  );
}

function UserInfoWhenLogin({ context, setClickLogin }) {
  return (
    <Navbar.Brand>
      <Dropdown align={"end"}>
        <Dropdown.Toggle as={CustomToggle}>
          <UserInfo />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item disabled>{context.loggedUser.name}</Dropdown.Item>
          <Dropdown.Item href="/user">유저 정보</Dropdown.Item>
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
  );
}
function UserInfoWhenNotLogin({ setClickLogin, clickLogin }) {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="light"
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        onClick={(e) => setClickLogin(true)}
      >
        로그인
      </Button>
      <Login show={clickLogin} handleClose={(e) => setClickLogin(false)} />
      <Button
        variant="light"
        onClick={(e) => navigate("/user/register")}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        회원가입
      </Button>
    </>
  );
}
export default Navigator;
