import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Row,
  Col,
  Form,
  Button,
  Table,
  Image,
} from "react-bootstrap";
import AdminLayout from "./AdminLayout";
import { getTickets } from "../AxiosUtil";
import { UserContext } from "../../context/User-context";
import { LoginError } from "../../util/revalidate";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import CustomPagenation from "../Pagenation";

export default function Tickets() {
  // 티켓 응답
  // 티켓 조회
  // 티켓 필터링
  // 티켓 닫기

  const [tickets, setTickets] = useState([]);
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    id: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [pageable, setPageable] = useState({ page: 0, size: 30 });
  const [count, setCount] = useState(0);
  const invoke = async () => {
    try {
      const data = await getTickets(context, filter);
      setTickets(data.data);
      setLoading(true);
      setCount(data.count);
    } catch (e) {
      if (e instanceof LoginError) {
        alert("로그인이 필요합니다.");
        context.initialize();
        navigate("/admin/login");
      }
    }
  };
  useEffect(() => {
    invoke();
  }, []);

  return (
    <AdminLayout>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>필터</Accordion.Header>
          <Accordion.Body>
            <Row className="m-2">
              <Col>
                <Form.Group>
                  <Form.Label>id</Form.Label>
                  <Form.Control
                    value={filter.id}
                    onChange={(e) =>
                      setFilter((prev) => ({ ...prev, id: e.target.value }))
                    }
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>문의 종류</Form.Label>
                  <Form.Select
                    id="ticket-type"
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        type: $("#ticket-type option:selected").get()[0].value,
                      }));
                    }}
                  >
                    <option value="">문의 종류</option>
                    <option value="TYPE_LESSON">레슨</option>
                    <option value="TYPE_PAYMENT">커뮤니티</option>
                    <option value="TYPE_SHEET">악보</option>
                    <option value="TYPE_PAYMENT">결제</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-2">
              <Col>
                <Form.Group>
                  <Form.Label>상태별</Form.Label>
                  <Form.Select
                    id="ticket-status"
                    defaultChecked={""}
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        status: $("#ticket-status option:selected").get()[0]
                          .value,
                      }));
                    }}
                  >
                    <option value="">진행 상태</option>
                    <option value="CREATED">생성됨</option>
                    <option value="PRODUCING">진행 중</option>
                    <option value="CLOSED">닫힘</option>
                    <option value="FINISHED">해결됨</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-2">
              <Col>
                <Form.Group>
                  <Form.Label>생성일자</Form.Label>
                  <Form.Control
                    type="date"
                    style={{ width: "30%" }}
                    onChange={(e) => {
                      console.log(e);
                      setFilter((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }));
                    }}
                  ></Form.Control>
                  ~
                  <Form.Control
                    type="date"
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }));
                    }}
                    style={{ width: "30%" }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>page</Form.Label>
                  <Form.Select
                    id="size"
                    onChange={(e) => {
                      setPageable((prev) => ({
                        ...prev,
                        size: $("#size option:selected").get()[0].value,
                      }));
                    }}
                  >
                    <option value="30">30개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    invoke();
                  }}
                >
                  검색
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Table>
        <thead>
          <tr>
            <td>id</td>
            <td>username</td>
            <td>ticket type</td>
            <td>title</td>
            <td>status</td>
            <td>created at</td>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item, idx) => {
            return (
              <>
                <tr
                  onClick={(e) => {
                    navigate(`/admin/tickets/${item.id}`);
                  }}
                  key={idx}
                  idx={idx}
                >
                  <td>{item.id}</td>
                  <td>{item.author.username}</td>
                  <td>{item.type}</td>
                  <td>{item.title}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.createdAt[0]}.{item.createdAt[1]}.{item.createdAt[2]}{" "}
                    {item.createdAt[3]}:{item.createdAt[4]}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <div className="w-100 d-flex justify-content-center">
        <CustomPagenation
          count={count}
          pageable={pageable}
          setPageable={setPageable}
        />
      </div>
    </AdminLayout>
  );
}
