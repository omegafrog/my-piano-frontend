import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "./User-context";
import { addToCart, checkInCart } from "./AxiosUtil";

export default function CartBtn({ item, alertValue }) {
  const context = useContext(UserContext);
  useEffect(() => {
    if (
      context.loggedIn === true &&
      (context.loggedUser.role === "USER" ||
        context.loggedUser.role === "CREATOR")
    )
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
      disabled={
        context.loggedIn === true &&
        (context.loggedUser === "ADMIN" ||
          context.loggedUser === "SU_ADMIN" ||
          context.loggedUser.id === item.artist.id)
      }
    >
      카트에 추가하기
    </Button>
  );
}
