import { useContext, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { UserContext } from "../../context/User-context";
import { useNavigate } from "react-router";
import { getPosts, getPostsAdmin } from "../AxiosUtil";
import { LoginError } from "../../util/revalidate";
import { Row, Col, Accordion, Form, Button, Table } from "react-bootstrap";
import $ from "jquery";
import CustomPagenation from "../Pagenation";

export default function AdminPosts() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [pageable, setPageable] = useState({
    size: 30,
    page: 0,
  });
  const [filter, setFilter] = useState({
    id: "",
    authorId: "",
    startDate: "",
    endDate: "",
  });

  async function invoke() {
    try {
      const page = await getPostsAdmin(context, filter, pageable);
      console.log("page:", page);
      setData(page.content);
      setCount(page.numberOfElements);
    } catch (e) {
      if (e instanceof LoginError) {
        console.error(e);
        alert("로그인이 필요합니다.");
        context.initialize();
        navigate("/admin/login");
      }
    }
  }
  useEffect(() => {
    invoke();
  }, []);
  return (
    <AdminLayout>
      <div>
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
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      value={filter.email}
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-2">
                <Col>
                  <Form.Group>
                    <Form.Label>loginMethod</Form.Label>
                    <Form.Control
                      value={filter.loginMethod}
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          loginMethod: e.target.value,
                        }))
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>locked</Form.Label>
                    <Form.Select
                      id="locked"
                      onChange={(e) => {
                        setPageable((prev) => ({
                          ...prev,
                          size: $("#locked option:selected").get()[0].value,
                        }));
                      }}
                    >
                      <option value="">locked</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
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
                        setFilter((prev) => ({
                          ...prev,
                          dateStart: e.target.value,
                        }));
                      }}
                    ></Form.Control>
                    ~
                    <Form.Control
                      type="date"
                      style={{ width: "30%" }}
                      onChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          dateEnd: e.target.value,
                        }));
                      }}
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
                  <Button onClick={() => invoke()}>검색</Button>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <td>id</td>
              <td>title</td>
              <td>username</td>
              <td>created at</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <>
                  <tr
                    onClick={() => {
                      navigate(`/post/${item.id}`);
                    }}
                    key={idx}
                    idx={idx}
                  >
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.authorName}</td>

                    <td>
                      {item.createdAt[0]}.{item.createdAt[1]}.
                      {item.createdAt[2]} {item.createdAt[3]}:
                      {item.createdAt[4]}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <CustomPagenation
          pageable={pageable}
          setPageable={setPageable}
          count={count}
        />
      </div>
    </AdminLayout>
  );
}
