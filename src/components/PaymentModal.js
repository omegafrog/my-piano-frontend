import { useContext, useEffect, useState } from "react";
import { UserContext } from "./User-context";
import { isPurcahsed, pay } from "./AxiosUtil";
import { AlertContext } from "../context/AlertContext";
import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";

export default function PaymentModal({ item, target }) {
  const context = useContext(UserContext);
  const [show, setShow] = useState(false);
  const alertValue = useContext(AlertContext);
  const navigate = useNavigate();
  const hideModal = () => setShow(false);
  const showModal = () => {
    if (context.loggedIn !== true) {
      alert("로그인하고 이용해주세요.");
    } else {
      context.syncUserInfo();
      setShow(true);
    }
  };

  useEffect(() => {
    const payBtn = document.querySelector("#payment-btn");
    if (context.loggedUser.id === item.artist.id) {
      payBtn.innerHTML = "내 악보입니다.";
      payBtn.disabled = true;
      return;
    } else if (context.loggedIn === false) {
      payBtn.innerHTML = "구매하기";
      payBtn.disabled = false;
    }
    if (context.loggedIn === true) {
      isPurcahsed(context, target, item, payBtn);
    }
  }, [context.loggedUser]);
  const restCash = context.loggedUser.cash - item.price;
  const purchase = async () => {
    try {
      await pay(context, target, item);
    } catch (e) {
      console.error(e.response);
      alertValue.alert("danger", e.message);
    } finally {
      hideModal();
      navigate(`/${target}/${item.id}`);
    }
  };

  const restCashColor = restCash < 0 ? "red" : "black";
  return (
    <>
      <Button
        variant="outline-danger"
        className="w-100"
        id="payment-btn"
        size="lg"
        style={{ margin: "5px" }}
        onClick={showModal}
      >
        지금 구매
      </Button>

      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{item.price === 0 ? "무료입니다." : `${item.price}원`}</h3>
            <h5>{target === "sheet" ? item.sheet.title : item.title}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-4">
          <div className="d-flex justify-content-between">
            <span>보유 캐시</span>
            <span>{context.loggedUser.cash}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>차감될 캐시</span>
            <span>{item.price}</span>
          </div>
          <hr></hr>
          <div className="d-flex justify-content-between">
            <span>남은 캐시</span>
            <span style={{ color: restCashColor }}>
              {context.loggedUser.cash - item.price}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {restCash < 0 ? (
            <Button variant="danger" disabled onClick={hideModal}>
              잔액이 부족합니다
            </Button>
          ) : (
            <Button variant="primary" onClick={purchase}>
              구매 확정
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
