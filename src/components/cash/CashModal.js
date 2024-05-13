import { useContext, useState } from "react";
import {
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { UserContext } from "../../context/User-context";
import { createCashOrder } from "../AxiosUtil";
import { useNavigate } from "react-router";

export default function CashModal({ cashModalShow, setCashModalShow }) {
  const [cashAmount, setCashAmount] = useState(0);
  const cashAmounts = [100000, 50000, 10000, 5000, 1000];
  const context = useContext(UserContext);
  const navigate = useNavigate();
  return (
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
              await createCashOrder(
                context,
                orderId,
                cashAmount,
                `${cashAmount}원 결제`
              );
              navigate(
                `/cash/checkout?orderId=${orderId}&amount=${cashAmount}`
              );
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
  );
}
