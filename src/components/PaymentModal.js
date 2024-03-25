import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "./User-context";
import $ from "jquery";
import axios from "axios";

export default function PaymentModal({ item, target }) {
  console.log("item:", item);
  const context = useContext(UserContext);
  const [show, setShow] = useState(false);
  const hideModal = () => setShow(false);
  const showModal = () => {
    if (context.loggedIn !== true) {
      alert("로그인하고 이용해주세요.");
    } else {
      console.log("clicked");
      console.log(context);
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
    axios
      .get(`http://localhost:8080/order/${target}/${item.id}`, {
        headers: {
          Authorization: context.accessToken,
        },
        withCredentials: true,
        validateStatus: false,
      })
      .then((response) => {
        if (response.data.status === 200) {
          if (response.data.data.isOrdered === true) {
            payBtn.innerHTML = "이미 구매하신 상품입니다.";
            payBtn.disabled = true;
            $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
            $("#cart-btn").css("font-size", "16px");
            $("#cart-btn").addClass("disabled");
          }
        }
      });
  }, [context.loggedUser]);
  const restCash = context.loggedUser.cash - item.price;
  const purchase = () => {
    axios
      .post(
        `http://localhost:8080/order/${target}`,
        {
          itemId: item.id,
          buyerId: context.loggedUser.id,
        },
        {
          headers: {
            Authorization: context.accessToken,
          },
          withCredentials: true,
          validateStatus: false,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          hideModal();
        }
      })
      .catch((error) => {
        alert("error");
        hideModal();
      })
      .finally(() => {
        window.location.replace(`/${target}/${item.id}`);
      });
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
