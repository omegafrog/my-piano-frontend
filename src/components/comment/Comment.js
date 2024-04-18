import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { UserContext } from "../User-context";
import { ItemListUserInfo } from "../user/userInfo";
import styles from "../../css/Comment.module.scss";
import $ from "jquery";
import { AlertContext } from "../../context/AlertContext";
import { addComment, deleteComment, getComments } from "../AxiosUtil";

export default function Comment({ target }) {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const context = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const alertValue = useContext(AlertContext);

  const writeComment = async () => {
    try {
      const data = await addComment(context, target, id, content);
      setCommentList(data.comments);
      $(".comment-textarea").val("");
    } catch (e) {
      console.error(e);
      alertValue.alert("danger", e.message);
    }
  };

  useEffect(() => {
    async function invoke() {
      try {
        const data = await getComments(target, id);
        setCommentList(data.comments);
      } catch (e) {
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
  }, []);

  return (
    <div className="w-100 my-3">
      <Form>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Form.Control
              className="comment-textarea"
              as={"textarea"}
              rows={3}
              type="text"
              style={{ resize: "none" }}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
          </Col>
          <Col
            xs={1}
            className="d-flex justify-content-center align-items-center "
          >
            <Button className="w-100 h-100" onClick={writeComment}>
              쓰기
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        {commentList.length > 0 ? (
          commentList.map((item, idx) => {
            return (
              <>
                <hr />
                <Row className={`w-100 ${styles.comment}`} key={idx}>
                  <Col xs={"auto"}>
                    <ItemListUserInfo
                      profileSrc={item.author.profileSrc}
                      name={item.author.name}
                    />
                  </Col>
                  <Col>
                    <span>{item.content}</span>
                  </Col>
                  <Col xs={"auto"}>
                    {item.author.id === context.loggedUser.id ? (
                      <RemoveCommentBtn
                        idx={idx}
                        context={context}
                        commentListValue={{ commentList, setCommentList }}
                        target={"community/posts"}
                        id={id}
                      />
                    ) : null}
                  </Col>
                </Row>
              </>
            );
          })
        ) : (
          <div className={styles.emptyComment}>
            <span>댓글이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function RemoveCommentBtn({ idx, context, commentListValue, target, id }) {
  const { commentList, setCommentList } = commentListValue;
  const alertValue = useContext(AlertContext);
  const removeComment = async () => {
    const commentId = commentList[idx].id;
    try {
      const data = await deleteComment(context, target, id, commentId);
      setCommentList(data.comments);
    } catch (e) {
      console.error(e);
      alertValue.alert("danger", e.message);
    }
  };
  return (
    <Button variant="outline-danger" onClick={removeComment}>
      삭제
    </Button>
  );
}
