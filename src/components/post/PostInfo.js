import { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { deletePostAdmin, getPost, updatePostAdmin } from "../AxiosUtil";
import { UserContext } from "../../context/User-context";
import { Navigate, useNavigate, useParams } from "react-router";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import styles from "./postInfo.module.scss";
import Comment from "../comment/Comment";
import LikeBtn from "../LikeBtn";
import { LoginError } from "../../util/revalidate";
import $ from "jquery";

export default function PostInfo() {
  const [data, setData] = useState();
  const { id } = useParams();
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [timeDiffString, setTimeDiffString] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      const data = await getPost(context, id);
      setData(data);
      setLoading(true);
      if (
        context.loggedIn === false ||
        context.loggedUser.role === "USER" ||
        context.loggedUser.role === "CREATOR"
      ) {
        if (data.disabled === true) {
          alert("비공개 처리된 글입니다.");
          navigate(-1);
        }
      }
      const createdAt = new Date(
        `${data.createdAt[0]}-` +
          `${data.createdAt[1]}-` +
          `${data.createdAt[2]} ` +
          `${data.createdAt[3]}:${data.createdAt[4]}:${data.createdAt[5]}`
      );
      const current = new Date();
      // 시간 차이가 하루 이내일때
      if (
        createdAt.getFullYear() === current.getFullYear() &&
        createdAt.getMonth() === current.getMonth() &&
        createdAt.getDate() === current.getDate()
      ) {
        // 시간 차이가 한시간 이내일때
        if (createdAt.getHours() === current.getHours()) {
          // 시간 차이가 1분 이내일 때
          if (createdAt.getMinutes() === current.getMinutes())
            setTimeDiffString("방금 전");
          else
            setTimeDiffString(
              `${current.getMinutes() - createdAt.getMinutes()}분 전`
            );
        } else
          setTimeDiffString(
            `${current.getHours() - createdAt.getHours()}시간 전`
          );
      } else {
        setTimeDiffString(`${current.getDate() - createdAt.getDate()}일 전`);
      }
    }
    invoke();
  }, []);
  return (
    <Layout>
      <Container fluid className="w-75">
        {loading === true ? (
          <div className={`${styles.container} mt-5 p-4 `} style={{}}>
            <div className="user pb-3">
              <Row>
                <Col xs={"auto"} style={{ paddingRight: "0px" }}>
                  <Image
                    className="sm"
                    src={
                      data.author.profileSrc !== ""
                        ? data.author.profileSrc
                        : "/img/defaultUserImg.png"
                    }
                    roundedCircle
                    style={{ width: "50px", height: "50px" }}
                  />
                </Col>

                <Col xs={"auto"} style={{ paddingLeft: "10px" }}>
                  <span className={styles.author}>{data.author.username}</span>
                  <span className={styles.createdAt}>
                    {timeDiffString} • 조회수 {data.viewCount} 회
                  </span>
                </Col>

                <Col className="d-flex justify-content-end">
                  {context.loggedIn &&
                  context.loggedUser.id === data.author.id ? (
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        navigate("edit");
                      }}
                    >
                      <img src="/img/edit-button.png" />
                    </button>
                  ) : null}
                  {context.loggedUser.role === "ADMIN" ? (
                    <>
                      <Button
                        className="mx-1"
                        variant="danger"
                        onClick={async () => {
                          try {
                            if (window.confirm("삭제하시겠습니까?")) {
                              await deletePostAdmin(context, id);
                              alert("삭제되었습니다.");
                              navigate("/admin/posts");
                            }
                          } catch (e) {
                            console.error(e);
                            if (e instanceof LoginError) {
                              alert("로그인이 필요합니다.");
                              context.initialize();
                              navigate("/admin/login");
                            }
                          }
                        }}
                      >
                        삭제
                      </Button>
                      <Button
                        className="mx-1"
                        variant="danger"
                        id="disable"
                        onClick={async () => {
                          try {
                            const button = $("button#disable").get()[0];
                            button.classList.toggle("active");

                            //활성화 상태라면
                            if (button.classList.contains("active")) {
                              button.innerHTML = "비공개 됨";
                              await updatePostAdmin(context, id, {
                                disable: true,
                              });
                            } else {
                              button.innerHTML = "공개 됨";
                              await updatePostAdmin(context, id, {
                                disable: false,
                              });
                            }
                          } catch (e) {
                            if (e instanceof LoginError) {
                              console.error(e);
                              alert("로그인이 필요합니다.");
                              context.initialize();
                              navigate("/admin/login");
                            }
                          }
                        }}
                      >
                        {data.disabled === true ? "비공개 됨" : "공개됨"}
                      </Button>
                    </>
                  ) : null}
                </Col>
              </Row>
            </div>
            <div className={`${styles.content} mt-3`}>
              <h2 className={styles.title}>{data.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="content align-self-start mt-5"
              />
              <LikeBtn
                target={"community/posts"}
                id={data.id}
                value={[data, setData]}
              />
            </div>
            <hr />
            <div>
              <Comment target={"community/posts"} />
            </div>
          </div>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </Container>
    </Layout>
  );
}
