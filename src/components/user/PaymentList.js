import { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import Layout from "../Layout";
import { AlertContext } from "../../context/AlertContext";
import LeftUserNavigator from "../navigator/LeftUserNavigator";

export default function PaymentList({ context, alertContext }) {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filter, setFilter] = useState({
    date: { start: "", end: "" },
    type: { sheet: false, lesson: false },
  });
  const alertValue = useContext(AlertContext);
  useEffect(() => {
    async function a() {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/cash?page=0,size=10`,
          {
            headers: {
              Authorization: context.accessToken,
            },
          }
        );
        if (result.status === 200 && result.data.status === 200) {
          console.log(result.data.data);
          setPaymentHistory(result.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    console.log(filter);
    a();
  }, [filter]);
  return (
    <Layout alertValue={alertValue} leftNav={<LeftUserNavigator />}>
      <Container>
        <h3>결제 내역</h3>
        <Accordion style={{ width: "100%" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>기간</Accordion.Header>
            <Accordion.Body>
              <input
                type="date"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (Date.parse(e.target.value) > Date.now()) {
                    alertContext.alert(
                      "danger",
                      "오늘보다 미래의 기록은 얻을 수 없습니다."
                    );
                    e.target.value = "";
                    return;
                  }
                  setFilter((prev) => ({
                    ...prev,
                    date: {
                      ...prev.date,
                      start: e.target.value,
                    },
                  }));
                }}
              ></input>
              <span>부터</span>
              <input
                type="date"
                onChange={(e) => {
                  console.log(e.target.value);
                  console.log(
                    Date.parse(filter.date.start),
                    Date.parse(e.target.value)
                  );
                  if (
                    Date.parse(filter.date.start) > Date.parse(e.target.value)
                  ) {
                    alertContext.alert(
                      "danger",
                      "끝나는 일자가 시작일자 이전입니다"
                    );
                    e.target.value = "";
                    return;
                  }
                  if (Date.parse(e.target.value) > Date.now()) {
                    alertContext.alert(
                      "danger",
                      "오늘보다 미래의 기록은 얻을 수 없습니다."
                    );
                    e.target.value = "";
                    return;
                  }
                  setFilter((prev) => ({
                    ...prev,
                    date: { ...prev.date, end: e.target.value },
                  }));
                }}
              />
              <span>까지</span>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>종류</Accordion.Header>
            <Accordion.Body>
              <Form.Switch
                id="sheet"
                value="sheet"
                label="악보"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    type: {
                      ...prev.type,
                      sheet: e.target.checked,
                    },
                  }));
                }}
              ></Form.Switch>
              <Form.Switch
                id="lesson"
                value="lesson"
                label="레슨"
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    type: {
                      ...prev.type,
                      lesson: e.target.checked,
                    },
                  }));
                }}
              ></Form.Switch>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Container style={{ width: "1200px" }}>
          <table className="w-100">
            <thead style={{ borderBottom: "1px solid black" }}>
              <td>주문일시</td>
              <td>주문번호</td>
              <td>결제상태</td>
              <td>결제상품</td>
              <td></td>
            </thead>
            <tbody>
              {paymentHistory.map((history, index) => {
                return (
                  <tr>
                    <td>{history.createdAt}</td>
                    <td>{history.orderId}</td>
                    <td>{history.status}</td>
                    <td>{history.orderName}</td>
                    <td>
                      <Button variant="danger">취소</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </Container>
    </Layout>
  );
}
