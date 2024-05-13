import { useNavigate } from "react-router";
import { useParams, useSearchParams } from "react-router-dom";
import { requestPayment } from "../AxiosUtil";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User-context";

export default function ConfirmPayment() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const paymentKey = params.get("paymentKey");
  const orderId = params.get("orderId");
  const amount = Number(params.get("amount"));
  const paymentType = params.get("paymentType");

  // TODO : parameter 검증

  useEffect(() => {
    (async () => {
      try {
        const response = await requestPayment(
          context,
          paymentKey,
          orderId,
          amount
        );
        if (response.data.status === 200) {
          navigate("/cash/success");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });
  return <></>;
}
