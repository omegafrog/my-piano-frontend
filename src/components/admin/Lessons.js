import { useContext, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router";
import { UserContext } from "../User-context";
import { AlertContext } from "../../context/AlertContext";
import { LoginError } from "../../util/revalidate";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import CustomPagenation from "../Pagenation";
import { getLessonsAdmin } from "../AxiosUtil";
import { CategoryMap } from "../../util/LessonEnumMap";
import $ from "jquery";

export default function Lessons() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const [filter, setFilter] = useState({});
  const [data, setData] = useState([]);
  const [pageable, setPageable] = useState({ page: 0, size: 30 });
  const [count, setCount] = useState(0);

  async function invoke() {
    try {
      console.log("filter:", filter);
      const page = await getLessonsAdmin(context, filter, pageable);
      setData(page.content);
      setCount(page.numberOfElements);
    } catch (e) {
      if (e instanceof LoginError) {
        console.error(e);
        alert("로그인이 필요합니다.");
        context.initialize();
        navigate("/admin/login");
      }
      alertContext.alert("danger", e.message);
    }
  }
  useEffect(() => {
    invoke();
  }, []);

  const categoryOpts = [];
  CategoryMap.forEach((value, key) =>
    categoryOpts.push(<option value={key}>{value}</option>)
  );

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
                  <Form.Label>카테고리</Form.Label>
                  <Form.Select
                    id="category"
                    onChange={(e) => {
                      setFilter((prev) => ({
                        ...prev,
                        difficulty: $("#difficulty option:selected").get()[0]
                          .value,
                      }));
                    }}
                  >
                    <option value="">모두 보기</option>
                    {categoryOpts}
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
            <td>creator</td>
            <td>lesson title</td>
            <td>sheet title</td>
            <td>category</td>
            <td>created at</td>
            <td>price</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <>
                <tr
                  onClick={(e) => {
                    navigate(`/lesson/${item.id}`);
                  }}
                  key={idx}
                  idx={idx}
                >
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.title}</td>
                  <td>{item.sheetTitle}</td>
                  <td>{item.difficulty}</td>
                  <td>{item.instrument}</td>
                  <td>
                    {item.genres.genre1}, {item.genres.genre2}
                  </td>
                  <td>{item.price}</td>
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
