import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./User-context";
import axios from "axios";
import $ from "jquery";

export default function CartBtn({ item, alertValue }) {
  const context = useContext(UserContext);
  useEffect(() => {
    if (!context || context.loggedIn === false) {
      return;
    }
    axios
      .get(`http://localhost:8080/cart/sheet/${item.id}`, {
        headers: {
          Authorization: context.accessToken,
        },
        validateStatus: false,
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          if (response.data.serializedData.isInCart === true) {
            $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
            $("#cart-btn").css("font-size", "16px");
            $("#cart-btn").addClass("disabled");
          }
        }
      });
  }, []);
  const addCart = () => {
    if (!context || context.loggedIn === false) {
      alert("로그인 후 이용해주세요");
    }
    axios
      .post(
        "http://localhost:8080/cart/sheet",
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
        if (response.data.status === 200) {
          alertValue.setShowAlert({
            state: true,
            text: "상품을 카트에 추가했습니다.",
          });
          $("#cart-btn").html("이미 카트에 추가된 상품입니다.");
          $("#cart-btn").css("font-size", "16px");
          $("#cart-btn").addClass("disabled");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <Button
      variant="outline-primary"
      className="w-100"
      id="cart-btn"
      size="lg"
      style={{ margin: "5px" }}
      onClick={addCart}
    >
      카트에 추가하기
    </Button>
  );
}
