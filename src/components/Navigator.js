import {
  Button,
  Col,
  Dropdown,
  Modal,
  Navbar,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import LogoBtn from "./LogoBtn";
import NavigationBtn from "./NavigationBtn";
import UserInfo from "./UserInfo";

import { useContext, useState } from "react";
import { UserContext } from "./User-context";
import { useNavigate } from "react-router";
import Login from "./Login";
import CustomToggle from "./navs/CustomNavToggle";
import { Logout, createCashOrder } from "./AxiosUtil";
import NavSearchRecommend from "./NavSearchRecommend";
import NavSearchBar from "./NavSearchBar";

function Navigator() {
  const context = useContext(UserContext);
  const [clickLogin, setClickLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [focus, setFocus] = useState(false);
  const [cashModalShow, setCashModalShow] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  const navigate = useNavigate();
  const cashAmounts = [100000, 50000, 10000, 5000, 1000];
  return (
    <>
      <Modal show={cashModalShow} onHide={() => setCashModalShow(false)}>
        <Modal.Header>
          <Modal.Title>캐쉬 구매</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToggleButtonGroup
            className="d-flex w-100 flex-column"
            type="radio"
            name="cashToggle"
          >
            {cashAmounts.map((amount, idx) => {
              return (
                <ToggleButton
                  value={amount}
                  variant="outline-primary"
                  className={`w-100 py-3 px-4 my-1`}
                  id={`radio-${idx}`}
                  key={idx}
                  onClick={(e) => {
                    setCashAmount(amount);
                  }}
                >
                  <span>{amount}원</span>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <span>현재 캐시</span>
            <span>{context.loggedUser.cash}</span>
          </div>
          <div className="d-flex justify-content-between w-100 my-3">
            <span>결제 금액</span>
            <span>{cashAmount}</span>
          </div>
          <Button
            variant="primary"
            onClick={async () => {
              const orderId = `cash-${crypto.randomUUID()}`;
              try {
                await createCashOrder(context, orderId, cashAmount);
                window.location.href = `/cash/checkout?orderId=${orderId}&amount=${cashAmount}`;
              } catch (error) {
                console.log(error);
              }
            }}
          >
            구매
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setCashModalShow(false);
            }}
          >
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar
        sticky="top"
        expand="lg"
        className="bg-body-tertiary border-bottom border-5"
        bg="light"
        data-bs-theme="light"
        style={{ height: "70px" }}
      >
        <Row className="d-flex justify-content-between align-items-center w-100 ">
          <Col xs={3} className="d-flex align-items-center">
            <Navbar.Brand href={"/main"}>
              <LogoBtn />
            </Navbar.Brand>
            <Navbar.Brand href="/sheet">
              <span>악보</span>
            </Navbar.Brand>
            <Navbar.Brand href="/lesson">
              <span>레슨</span>
            </Navbar.Brand>
            <Navbar.Brand href="/sheet">
              <span>커뮤니티</span>
            </Navbar.Brand>
          </Col>
          <Col style={{ position: "relative" }}>
            <NavSearchBar
              searchTermValue={{ searchTerm, setSearchTerm }}
              searchResultValue={{ searchResult, setSearchResult }}
              focusValue={{ focus, setFocus }}
            />
            <NavSearchRecommend focus={focus} searchResult={searchResult} />
          </Col>

          <Col
            xs={3}
            className="d-inline-flex justify-content-end align-items-center"
          >
            <Navbar.Brand
              onClick={() => {
                setCashModalShow(true);
              }}
            >
              <NavigationBtn img={"/img/coin-stack.png"} />
            </Navbar.Brand>
            <Navbar.Brand href="b">
              <NavigationBtn img={"/img/notification.png"} />
            </Navbar.Brand>
            <Navbar.Brand href="/cart">
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
                <Button
                  variant="light"
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  onClick={(e) => setClickLogin(true)}
                >
                  로그인
                </Button>
                <Login
                  show={clickLogin}
                  handleClose={(e) => setClickLogin(false)}
                />
                <Button
                  variant="light"
                  onClick={(e) => navigate("/user/register")}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
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
    </>
  );
}
export default Navigator;
