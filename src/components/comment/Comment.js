import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { UserContext } from "../../context/User-context";
import { ItemListUserInfo } from "../user/userInfo";

import "./comment.scss";
import $ from "jquery";
import { AlertContext } from "../../context/AlertContext";
import {
  addComment,
  deleteComment,
  getComments,
  replyComment,
} from "../AxiosUtil";
import CustomPagenation from "../Pagenation";

export default function Comment({ target }) {
  const { id: targetId } = useParams();
  const [pageable, setPageable] = useState({
    page: 0,
    size: 10,
  });
  const context = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);
  const alertValue = useContext(AlertContext);
  const [count, setCount] = useState(0);

  async function invoke() {
    try {
      const data = await getComments(target, targetId, pageable);
      setCommentList(data.content);
      setCount(data.totalElements);
    } catch (e) {
      console.error(e);
      alertValue.alert("danger", e.message);
    }
  }
  useEffect(() => {
    invoke();
  }, [pageable]);

  return (
    <div className="w-100 my-3">
      <Form>
        <WriteComment commentId={0} name={"comment"} />
      </Form>
      <div className="my-3">
        {commentList.length > 0 ? (
          <CommentBody comments={commentList} name={"comment"} margin={10} />
        ) : (
          <h3>댓글이 없습니다</h3>
        )}
      </div>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <CustomPagenation
          count={count}
          pageable={pageable}
          setPageable={setPageable}
        />
      </div>
    </div>
  );

  function CommentBody({ comments, name, margin }) {
    if (comments.length === 0) return;
    const ret = comments.map((item, idx) => {
      return (
        <Row
          key={idx}
          style={{ width: `calc(100%-${margin}px)` }}
          className="d-flex justify-content-end"
        >
          <Row className={`${name} w-100`}>
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
              <ReplyCommentBtn idx={idx} />
              {item.author.id === context.loggedUser.id ? (
                <RemoveCommentBtn
                  idx={idx}
                  context={context}
                  commentList={comments}
                  target={"community/posts"}
                  id={targetId}
                />
              ) : null}
            </Col>
          </Row>

          {item.replies.length > 0 ? (
            <CommentBody
              comments={item.replies}
              margin={margin + 10}
              name={"reply"}
            />
          ) : null}
          <Row
            style={{
              marginLeft: "30px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            className={"reply-form"}
            idx={idx}
          >
            <hr />
            <WriteComment commentId={item.id} name={"reply"} />
          </Row>
        </Row>
      );
    });
    return ret;
  }
  function ReplyCommentBtn() {
    return (
      <Button
        className="mx-1"
        variant="outline-primary"
        onClick={(e) => {
          const forms = $(`.reply-form.active`).get();
          forms.map((item, idx) => item.classList.remove("active"));
          const row = $(
            e.currentTarget.parentElement.parentElement.parentElement.children
          ).get();
          console.log(row);
          const commentDOM = row[row.length - 1];
          console.log(commentDOM);
          commentDOM.classList.toggle("active");
        }}
      >
        답글
      </Button>
    );
  }
  function RemoveCommentBtn({ idx, context, commentList, target, id }) {
    const alertValue = useContext(AlertContext);
    const removeComment = async () => {
      const commentId = commentList[idx].id;
      try {
        await deleteComment(context, target, id, commentId);
        invoke();
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
  function WriteComment({ commentId, name }) {
    const [content, setContent] = useState("");
    return (
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Form.Control
            className="comment-textarea"
            as={"textarea"}
            rows={3}
            type="text"
            style={{ resize: "none" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></Form.Control>
        </Col>
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center "
        >
          <Button
            className="w-100 h-100"
            onClick={async () => {
              console.log("name:", name);
              try {
                if (name === "comment") {
                  await addComment(context, target, targetId, content);
                } else if (name === "reply") {
                  await replyComment(
                    context,
                    target,
                    targetId,
                    commentId,
                    content
                  );
                }
              } catch (e) {
                console.error(e);
                alertValue.alert("danger", e.message);
              } finally {
                invoke();
              }
            }}
          >
            쓰기
          </Button>
        </Col>
      </Row>
    );
  }
}
