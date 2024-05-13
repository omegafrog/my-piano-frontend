import { useContext, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";
import { changeUserInfo, getUsers } from "../AxiosUtil";
import { UserContext } from "../../context/User-context";
import $ from "jquery";
import CustomPagenation from "../Pagenation";
import { LoginError } from "../../util/revalidate";
import { useNavigate } from "react-router";
import styles from "./users.module.scss";
import { AlertContext } from "../../context/AlertContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const context = useContext(UserContext);
  const [pageable, setPageable] = useState({ page: 0, size: 30, count: 0 });
  var [dataCount, setDataCount] = useState(0);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const alertContext = useContext(AlertContext);
  const [filter, setFilter] = useState({
    id: "",
    email: "",
    loginMethod: "",
    dateStart: "",
    dateEnd: "",
    locked: "",
  });
  const [changed, setChanged] = useState({
    before: {
      id: "",
      role: "",
      locked: "",
      remove: false,
    },
    after: {
      role: "",
      locked: "",
      remove: "",
    },
  });

  async function invoke() {
    try {
      const data = await getUsers(context, filter, pageable);
      setUsers(data.users);
      setDataCount(data.count);
      console.log(data.users);
    } catch (e) {
      console.error(e);
      if (e instanceof LoginError) {
        alert("로그인이 만료되었습니다.");
        context.initialize();
        navigate("/admin/login");
      }
    }
  }
  useEffect(() => {
    invoke();
  }, [pageable]);

  return (
    <AdminLayout>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header>
          유저 {changed.before.id}이 다음과 같이 수정됩니다
        </Modal.Header>
        <Modal.Body>
          권한 : {changed.before.role}->{changed.after.role} <br />
          계정 잠금 : {changed.before.locked.toString()}->
          {changed.after.locked.toString()}
          <br />
          계정 삭제 : {changed.after.remove.toString()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={async () => {
              try {
                await changeUserInfo(context, changed.before.id, changed.after);
                alert("성공");
                navigate(0);
              } catch (e) {
                console.error(e);
                if (e instanceof LoginError) {
                  alert("로그인이 필요합니다");
                  context.initialize();
                  navigate("/admin/login");
                } else alertContext.alret("danger", e.message);
              }
            }}
          >
            확인
          </Button>
          <Button variant="danger" onClick={() => setModalShow(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <h3>유저 관리</h3>
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
          <Table>
            <thead>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>username</td>
                <td>login method</td>
                <td>created at</td>
                <td>role</td>
                <td>locked</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users.map((item, idx) => {
                return (
                  <>
                    <tr
                      onClick={(e) => {
                        setChanged((prev) => ({
                          before: {
                            id: item.id,
                            locked: item.locked,
                            role: item.role,
                            remove: false,
                          },
                          after: {
                            locked: item.locked,
                            role: item.role,
                            remove: false,
                          },
                        }));
                        const prevFolded = $(`tr[style=""]`).get();
                        prevFolded.forEach(
                          (item, index) => (item.style.display = "none")
                        );
                        const folded = $(`tr[idx=${idx}]`).next();
                        console.log("folded:", folded);
                        if (folded.get()[0].style.display === "none")
                          folded.get()[0].style.display = "";
                        else folded.get()[0].style.display = "none";
                      }}
                      key={idx}
                      idx={idx}
                    >
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.loginMethod}</td>

                      <td>
                        {item.createdAt[0]}.{item.createdAt[1]}.
                        {item.createdAt[2]} {item.createdAt[3]}:
                        {item.createdAt[4]}
                      </td>
                      <td>{item.role}</td>
                      <td>{item.locked.toString()}</td>
                    </tr>
                    <tr
                      className={styles.fold}
                      id={idx}
                      style={{ display: "none" }}
                    >
                      <td colSpan={7}>
                        <Row className="py-3">
                          <Col className="p-3">
                            <Form.Group>
                              <Form.Label>권한 변경</Form.Label>
                              <Form.Select
                                id={"role-select"}
                                onChange={(e) => {
                                  setChanged((prev) => ({
                                    ...prev,
                                    after: {
                                      ...prev.after,
                                      role: $(
                                        `tr[id=${idx}] #role-select option:selected`
                                      ).get()[0].value,
                                    },
                                  }));
                                }}
                              >
                                <option value="USER">user</option>
                                <option value="CREATOR">creator</option>
                                <option value="ADMIN">admin</option>
                                <option value="SU_ADMIN">super_admin</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col className="p-3">
                            <Form.Group>
                              <Form.Switch
                                label="계정 잠금"
                                defaultChecked={item.locked}
                                onChange={(e) => {
                                  console.log(e);
                                  setChanged((prev) => ({
                                    ...prev,
                                    after: {
                                      ...prev.after,
                                      locked: e.target.checked,
                                    },
                                  }));
                                }}
                              ></Form.Switch>
                            </Form.Group>
                            <Form.Check
                              className="m-1"
                              label="유저 삭제"
                              onChange={(e) => {
                                console.log(e.target.checked);
                                setChanged((prev) => ({
                                  ...prev,
                                  after: {
                                    ...prev.after,
                                    remove: e.target.checked,
                                  },
                                }));
                              }}
                            ></Form.Check>
                          </Col>

                          <Col xs="auto" className="d-flex align-items-end">
                            <Button
                              onClick={async () => {
                                setModalShow(true);
                              }}
                            >
                              변경하기
                            </Button>
                          </Col>
                        </Row>
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
            count={dataCount}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
