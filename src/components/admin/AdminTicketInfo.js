import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Image, Row, Col, Form, Button } from "react-bootstrap";
import { closeTicket, getTickets, sendReply } from "../AxiosUtil";
import { UserContext } from "../User-context";
import { AlertContext } from "../../context/AlertContext";
import AdminLayout from "./AdminLayout";
import { LoginError } from "../../util/revalidate";
import { TicketStatusMap } from "../../util/TicketEnumMap";
import $ from "jquery";
import Tickets from "./Tickets";

export default function AdminTicket() {
  const { id } = useParams();
  console.log(id);

  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);

  const filter = {
    id: id,
    type: "",
    status: "",
    startDate: "",
    endDate: "",
  };
  const [replyContent, setReplyContent] = useState();
  useEffect(() => {
    async function invoke() {
      try {
        const data = await getTickets(context, filter);
        const tmp = data.data[0];
        if (tmp.author.profileSrc === "")
          tmp.author.profileSrc = "/img/defaultUserImg.png";
        setTicket(tmp);
        setLoading(true);
        setReplies(tmp.reply);
      } catch (e) {
        if (e instanceof LoginError) {
          alert("로그인이 필요합니다.");
          context.initialize();
          navigate("/admin/login");
        }
      }
    }
    invoke();
  }, []);
  console.log(ticket);
  console.log($(".replies").get()[0]);
  console.log(replies);
  // const root = ReactDOM.createRoot();

  return (
    <AdminLayout>
      {loading === true ? (
        <>
          <div className="m-4">
            <Row
              className="w-100"
              style={{ borderBottom: "1px solid #b5bcc4" }}
            >
              <Col style={{ maxWidth: "80%" }}>
                <span
                  style={{ fontSize: "2.5rem", overflowWrap: "break-word" }}
                >
                  {ticket.title}
                </span>
              </Col>
              <Col className="my-3 d-flex flex-column " xs={2}>
                <div className="d-flex align-items-center">
                  <div className="mx-2">
                    <Image
                      style={{ width: "30px", height: "30px" }}
                      src={ticket.author.profileSrc}
                    ></Image>
                  </div>
                  <div>
                    <span style={{ fontSize: "1.0rem" }}>
                      {ticket.author.username}
                    </span>
                  </div>
                </div>
                <div>
                  <span>
                    생성일자 : {ticket.createdAt[0]}.{ticket.createdAt[1]}.
                    {ticket.createdAt[2]} {ticket.createdAt[3]}:
                    {ticket.createdAt[4]}
                  </span>
                </div>
                <div>
                  <span>{TicketStatusMap[ticket.status]}</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="m-3">
                <span style={{ overflowWrap: "break-word" }}>
                  {ticket.content}
                </span>
              </Col>
            </Row>
            <div className="replies">
              {replies.map((item, idx) => {
                return <Reply item={item} ticket={ticket} />;
              })}
            </div>
            {ticket.status === "FINISHED" || ticket.status === "CLOSED" ? (
              <span>이미 닫힌 문의입니다.</span>
            ) : (
              <Row>
                <Col className="p-0 py-3">
                  <Form.Control
                    as="textarea"
                    placeholder="내용을 입력하세요"
                    rows={4}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col
                  xs={"auto"}
                  className="d-flex flex-column justify-content-center"
                >
                  <Button
                    onClick={async (e) => {
                      try {
                        const data = await sendReply(context, id, replyContent);
                        console.log("data:", data);
                        setReplies((prev) => [...prev, data]);
                      } catch (e) {
                        if (e instanceof LoginError) {
                          alert("로그인이 필요합니다.");
                          context.initialize();
                          navigate("/admin/login");
                        }
                      }
                    }}
                  >
                    응답하기
                  </Button>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      const isClosed = window.confirm("문의를 닫으시겠습니까?");
                      if (isClosed === true) {
                        try {
                          await closeTicket(context, id);
                          alert("문의를 닫았습니다.");
                          navigate(0);
                        } catch (e) {
                          if (e instanceof LoginError) {
                            alert("로그인이 필요합니다.");
                            context.initialize();
                            navigate("/admin/login");
                          }
                        }
                      }
                    }}
                  >
                    문의 닫기
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </AdminLayout>
  );
}

function Reply({ item }) {
  return (
    <Row
      className="my-1 p-3"
      style={{
        minHeight: "150px",
        border: "1px solid #ced6e0",
        borderRadius: "10px",
      }}
    >
      <Col>
        <div>{item.content}</div>
      </Col>
      <Col xs={"auto"}>
        <div>{item.name}</div>
        <div>
          {item.createdAt[0]}.{item.createdAt[1]}.{item.createdAt[2]}{" "}
          {item.createdAt[3]}시{item.createdAt[4]}분
        </div>
      </Col>
    </Row>
  );
}
