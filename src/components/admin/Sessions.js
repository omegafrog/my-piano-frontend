import { useContext, useEffect, useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { disconnectUser, getSessions } from "../AxiosUtil";
import { Button, Table } from "react-bootstrap";
import { UserContext } from "../../context/User-context";
import { LoginError } from "../../util/revalidate";
import { useNavigate } from "react-router";
import styles from "./sessions.module.scss";
import CustomPagenation from "../Pagenation";

export function Sessions() {
  const [sessions, setSessions] = useState([]);
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState({ page: 0, size: 30 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getSessions(context, paginate.page, paginate.size);
        setSessions(data.sessions);
        setCount(data.count);
      } catch (e) {
        if (e instanceof LoginError) {
          alert("로그인이 필요합니다.");
          navigate("/admin/login");
        }
      }
    }
    invoke();
  }, [paginate]);

  return (
    <AdminLayout>
      <div>
        <h3>로그인 세션 관리</h3>
        <div>
          <Table>
            <thead>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>username</td>
                <td>login method</td>
                <td>logged in at</td>
                <td>created at</td>
                <td>role</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {sessions.map((item, idx) => {
                return (
                  <tr className={styles.tr} onClick={() => {}} key={idx}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.method}</td>
                    <td>
                      {item.loggedInAt[0]}.{item.loggedInAt[1]}.
                      {item.loggedInAt[2]} {item.loggedInAt[3]}:
                      {item.loggedInAt[4]}
                    </td>
                    <td>
                      {item.createdAt[0]}.{item.createdAt[1]}.
                      {item.createdAt[2]} {item.createdAt[3]}:
                      {item.createdAt[4]}
                    </td>
                    <td>{item.role}</td>
                    <td style={{ width: "110px" }}>
                      <Button
                        variant="danger"
                        onClick={async () => {
                          await disconnectUser(context, item.id, item.role);
                          navigate(0);
                        }}
                      >
                        연결 해제
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center">
          <CustomPagenation
            pageable={paginate}
            setPageable={setPaginate}
            count={count}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
