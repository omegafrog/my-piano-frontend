import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User-context";
import { getFileUrl, isPurcahsed, pay } from "./AxiosUtil";
import { AlertContext } from "../context/AlertContext";
import { useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";
import $ from "jquery";

export default function PaymentModal({ item, target }) {
  const context = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("purchase");
  const [fileUrl, setFileUrl] = useState();
  const [modalLoading, setModalLoading] = useState(false);
  const alertValue = useContext(AlertContext);
  const navigate = useNavigate();
  const hideModal = () => setShow(false);
  const showModal = () => {
    setShow(true);
  };
  const download = async () => {
    const url = await getFileUrl(context, item.id);
    setFileUrl(url);
    setModalLoading(true);
  };
  useEffect(() => {
    async function invoke() {
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
        const data = await isPurcahsed(context, target, item, payBtn);
        if (data.isOrdered === true) {
          payBtn.innerHTML = "다운로드";
          payBtn.addEventListener("click", () => {
            setOption("download");
          });
          await download();
          $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
          $("#cart-btn").css("font-size", "16px");
          $("#cart-btn").addClass("disabled");
        }
      } else {
        $("#cart-btn").html("카트에 추가하기");
        $("#cart-btn").css("font-size", "");
        $("#cart-btn").removeClass("disabled");
      }
    }
    invoke();
  }, [context]);
  const restCash = context.loggedUser.cash - item.price;
  const purchase = async () => {
    try {
      await pay(context, target, item);
    } catch (e) {
      console.error(e.response);
      alertValue.alert("danger", e.message);
    } finally {
      hideModal();
      navigate(0);
    }
  };

  const restCashColor = restCash < 0 ? "red" : "black";

  const PurchaseModal = () => {
    return (
      <>
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
      </>
    );
  };
  const DownloadModal = () => {
    return (
      <>
        <Modal.Header>악보 다운로드</Modal.Header>
        <Modal.Body>
          {modalLoading === true ? (
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "rgba(189, 195, 199,0.6)",
                height: "40px",
                alignContent: "center",
                padding: "20px",
                borderRadius: "5px",
              }}
              onClick={async () => {
                const data = await fetch(`${fileUrl}`);
                const blob = await data.blob();
                const anchorElement = document.createElement("a");
                document.body.appendChild(anchorElement);
                anchorElement.download = item.sheet.originalFileName; // a tag에 download 속성을 줘서 클릭할 때 다운로드가 일어날 수 있도록 하기
                anchorElement.href = URL.createObjectURL(blob); // href에 url 달아주기
                anchorElement.click();
              }}
            >
              {item.sheet.originalFileName}
            </div>
          ) : (
            <h3>loading</h3>
          )}
        </Modal.Body>
      </>
    );
  };
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
        {option === "purchase" ? <PurchaseModal /> : <DownloadModal />}
      </Modal>
    </>
  );
}
