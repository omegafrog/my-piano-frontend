import { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Container, Form, Table } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../../context/User-context";
import { AlertContext } from "../../context/AlertContext";
import Layout from "../Layout";
import LeftUserNavigator from "../navigator/LeftUserNavigator";

export default function CashPaymentListPage() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filter, setFilter] = useState({
    date: { start: "", end: "" },
  });
  const context = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const dateInputRef = useRef(null);
  const dateOutputRef = useRef(null);

  useEffect(() => {
    async function a() {
      try {
        let endpoint = `${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/cash?page=0&size=20`;
        if (filter.date.start !== "" && filter.date.end !== "") {
          endpoint =
            endpoint + `&start=${filter.date.start}&end=${filter.date.end}`;
        }
        const result = await axios.get(endpoint, {
          headers: {
            Authorization: context.accessToken,
          },
        });
        if (result.status === 200 && result.data.status === 200) {
          console.log(result.data.data);
          let tmp = result.data.data;
          tmp.sort(function (a, b) {
            for (let i = 0; i < 6; i += 1) {
              if (a.createdAt[i] < b.createdAt[i]) return 1;
              else if (a.createdAt[i] > b.createdAt[i]) return -1;
              else continue;
            }
          });
          console.log(tmp);
          setPaymentHistory(tmp);
        }
      } catch (e) {
        console.error(e);
      }
    }
    console.log(filter);
    a();
  }, [filter]);
  return (
    <Layout alertValue={alertContext} leftNav={<LeftUserNavigator />}>
      <Container fluid className="d-flex flex-column w-75 p-5">
        <h3>결제 내역</h3>
        <Accordion style={{ width: "100%" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>기간</Accordion.Header>
            <Accordion.Body>
              <input
                ref={dateInputRef}
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
                ref={dateOutputRef}
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
              <Button
                variant="primary"
                onClick={() => {
                  dateInputRef.current.value = "";
                  dateOutputRef.current.value = "";
                  setFilter({ date: { start: "", end: "" } });
                }}
              >
                초기화
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Container className="w-100">
          <Table>
            <thead style={{ borderBottom: "1px solid black" }}>
              <tr>
                <td>주문일시</td>
                <td>주문번호</td>
                <td>결제상태</td>
                <td>결제상품</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((history, index) => {
                return (
                  <tr>
                    <td>{`${history.createdAt[0]}년 ${history.createdAt[1]}월 ${history.createdAt[2]}일 ${history.createdAt[3]}시 ${history.createdAt[4]}분 ${history.createdAt[5]}초`}</td>
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
          </Table>
        </Container>
      </Container>
    </Layout>
  );
}
