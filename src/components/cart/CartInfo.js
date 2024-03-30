import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Layout from "../Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import $ from "jquery";
import { deleteItemFromCart, getCart, payAllInCart } from "../AxiosUtil";
import { AlertContext } from "../../context/AlertContext";
import { useNavigate } from "react-router";

export default function CartInfo() {
  const alertValue = useContext(AlertContext);
  const context = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [selectedOrderList, setSelectedOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;
  const navigate = useNavigate();
  let restCash;
  let restCashColor;
  useEffect(() => {
    async function invoke() {
      try {
        const data = await getCart(context);
        setOrderList(data.contents);
      } catch (e) {
        console.error(e);
        alertValue.alert(e.message);
      }
    }
    invoke();
  }, []);

  useEffect(() => {
    if (
      orderList.length === selectedOrderList.length &&
      selectedOrderList.length > 0
    )
      $("#select-all").prop("checked", true);
    else $("#select-all").prop("checked", false);
    let tmp = 0;
    selectedOrderList.forEach((order) => (tmp += order.totalPrice));
    setTotalPrice(tmp);
    restCash = context.loggedUser.cash - totalPrice;
    restCashColor = restCash < 0 ? "red" : "black";
  }, [orderList, selectedOrderList]);

  const toggleCartItem = (e) => {
    if (e.target.classList.contains("checked")) {
      const newSelectedOrderList = selectedOrderList.filter(
        (order) => order.id !== Number(e.target.id)
      );
      setSelectedOrderList(newSelectedOrderList);
    } else {
      const appendOrder = orderList.filter(
        (order) => order.id === Number(e.target.id)
      )[0];
      setSelectedOrderList((prev) => [...prev, appendOrder]);
    }
    e.target.classList.toggle("checked");
  };
  const checkAll = (e) => {
    if ($("#select-all").prop("checked")) {
      setSelectedOrderList(orderList);
      $(".order").prop("checked", true);
      $(".order").addClass("checked");
    } else {
      setSelectedOrderList([]);
      $(".order").prop("checked", false);
      $(".order").removeClass("checked");
    }
  };
  const removeFromCart = async (e) => {
    try {
      await deleteItemFromCart(context, e.target.id);
      const newOrderList = orderList.filter(
        (item) => item.id !== Number(e.target.id)
      );
      const newSelectedOrderList = selectedOrderList.filter(
        (item) => item.id !== Number(e.target.id)
      );
      setOrderList(newOrderList);
      setSelectedOrderList(newSelectedOrderList);
    } catch (e) {
      console.error(e);
      alertValue.alert("danger", e.message);
    }
  };

  const payItem = async () => {
    try {
      var requestURI = `cart?`;
      selectedOrderList.forEach((order) => {
        requestURI += `orderId=${order.id}&`;
      });
      const data = await payAllInCart(context, requestURI);
      navigate(`/cart/success?payCnt=${data.payCnt}`);
    } catch (e) {
      console.error(e);
      alertValue.alert("danger", e.message);
    }
  };
  return (
    <Layout leftNav={false} alertValue={alertValue}>
      <Container className="p-5">
        <Row>
          <Col>
            <h3>장바구니</h3>

            <div style={{ borderTop: "4px solid black" }}>
              <div className="form-check py-4">
                <input
                  type="checkbox"
                  id="select-all"
                  className="form-check-input"
                  onClick={checkAll}
                ></input>
                <label htmlFor="select-all" className="form-check-lable">
                  전체 선택({selectedOrderList.length}/{orderList.length})
                </label>
              </div>
              <div>
                {orderList.map((order, idx) => {
                  return (
                    <div
                      className="form-check d-flex align-items-center py-2"
                      key={idx}
                    >
                      <input
                        id={order.id}
                        className="form-check-input order"
                        type="checkbox"
                        style={{ scale: "1.7" }}
                        onClick={toggleCartItem}
                      ></input>
                      <label
                        className="form-check-lable w-100"
                        htmlFor={order.id}
                        style={{ marginLeft: "20px" }}
                      >
                        <Row className="d-flex align-items-center w-100 ">
                          <Col xs={"auto"}>
                            <Image
                              src={`https://${bucketName}.s3.${region}.amazonaws.com/${
                                order.item.sheet.sheetUrl.split(",")[0]
                              }`}
                              style={{
                                height: "100px",
                                width: "auto",
                                overflow: "hidden",
                              }}
                            />
                          </Col>
                          <Col className="d-flex flex-column">
                            <span style={{ fontSize: "2rem" }}>
                              {order.item.title}
                            </span>
                            <span style={{ fontSize: "1.2rem" }}>
                              {order.seller.name}
                            </span>
                          </Col>
                          <Col xs={2}>
                            <strong style={{ fontSize: "1.2rem" }}>
                              {order.item.price}원
                            </strong>
                          </Col>
                        </Row>
                      </label>

                      <Col
                        xs={1}
                        onClick={removeFromCart}
                        id={order.id}
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      >
                        ❌
                      </Col>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col xs={4}>
            <h3>결제</h3>
            <div style={{ borderTop: "4px solid black" }}>
              <div className="d-flex justify-content-between align-items-center w-100 py-5 px-3">
                <h5>
                  <strong>총 가격</strong>
                </h5>
                <h3>
                  <strong>{totalPrice}원</strong>
                </h3>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <span>보유 캐시</span>
                  <span>{context.loggedUser.cash}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>차감될 캐시</span>
                  <span>{totalPrice}</span>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <span>남은 캐시</span>
                  <span style={{ color: restCashColor }}>
                    {context.loggedUser.cash - totalPrice}
                  </span>
                </div>
              </div>
              <Button
                className="w-100 my-2"
                onClick={() => {
                  payItem();
                }}
              >
                결제하기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
