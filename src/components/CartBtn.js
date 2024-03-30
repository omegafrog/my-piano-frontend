import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./User-context";
import { addToCart, checkInCart } from "./AxiosUtil";

export default function CartBtn({ item, alertValue }) {
  const context = useContext(UserContext);
  useEffect(() => {
    checkInCart(context, item);
  }, []);
  const addCart = () => {
    addToCart(context, item, alertValue);
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
