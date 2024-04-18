import { Bar } from "react-chartjs-2";
import AdminLayout from "./AdminLayout";
import { useContext, useEffect, useRef, useState } from "react";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";
import styles from "./dashboard.module.scss";
import { AlertContext } from "../../context/AlertContext";
import { UserContext } from "../User-context";

import { countLoggedUsers, getTickets } from "../AxiosUtil";
import { LoginError } from "../../util/revalidate";
import { useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";
import { TicketStatusMap, TicketTypeMap } from "../../util/TicketEnumMap";

export default function DashBoard() {
  var context = useContext(UserContext);
  var [ticketData, setTicketData] = useState([]);
  var [loading, setLoading] = useState(false);
  var [count, setCount] = useState(0);
  var navigate = useNavigate();
  var alertValue = useContext(AlertContext);
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(BarElement); // 접속 유저 수
  var datesArray = [];
  var currentDate = new Date();
  const [filter, setFilter] = useState({
    id: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const chartRef = useRef(null);
  for (var i = 0; i < 7; i++) {
    var date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const string = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}`;
    datesArray.push(string);
  }
  datesArray.reverse();

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getTickets(context, filter);
        setTicketData(data.data);
        setLoading(true);
        const loggedInUsers = await countLoggedUsers(context);
        setCount(loggedInUsers);
      } catch (e) {
        if (e instanceof LoginError) {
          context.initialize();
          alert(e.message);
          navigate("/admin/login");
        }
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
  }, []);

  const data = {
    labels: datesArray,
    datasets: [
      {
        label: "방문자 수",
        data: [12, 19, 3, 5, 2, 3, 10],
        borderWidth: 1,
      },
    ],
  };
  const users = (
    <div className="card w-100">
      <div className="card-body">
        <div className="clearfix mb-4">
          <h4 className="card-title float-left">접속자 통계</h4>
          <div
            id="visit-sale-chart-legend"
            className="rounded-legend legend-horizontal legend-top-right float-right"
          ></div>
        </div>
        <Bar
          ref={chartRef}
          className="chartLegendContainer"
          data={data}
          id="visitSaleChart"
        />
      </div>
    </div>
  );
  // 문의사항5개
  const tickets = (
    <div className="card w-100 h-100" style={{ overflowY: "scroll" }}>
      <div className="card-body">
        <div className="clearfix mb-4">
          <h4 className="card-title float-left">최근 문의사항</h4>
          {ticketData.map((data, idx) => {
            return (
              <div
                className={styles.ticket_item}
                key={idx}
                onClick={() => {
                  navigate(`/admin/tickets/${data.id}`);
                }}
              >
                <div>
                  <span className={styles.ticket_content}>{data.title}</span>
                </div>
                <div>
                  <div className="d-flex flex-column align-items-end">
                    <span>
                      {TicketTypeMap[data.type]}•{TicketStatusMap[data.status]}
                      •답변 {data.reply.length}개
                    </span>
                    <span>작성자 : {data.author.username}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  const currentUsers = (
    <div className="card w-100 h-100" style={{ overflowY: "scroll" }}>
      <div className="card-body">
        <div className="clearfix mb-4">
          <h4 className="card-title float-left">
            현재 로그인한 유저 : {count}명
          </h4>
        </div>
      </div>
    </div>
  );

  // 최근 보낸 알림
  return (
    <AdminLayout>
      {loading === true ? (
        <>
          <Row>
            <Col>{users}</Col>
            <Col>{tickets}</Col>
          </Row>
          <Row className="my-5">
            <Col xs={5}>{currentUsers}</Col>
          </Row>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </AdminLayout>
  );
}
