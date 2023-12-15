import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import revalidate from "../../util/revalidate";
import { UserContext } from "../User-context";
import { ItemListUserInfo } from "../user/userInfo";
import styles from "../../css/Comment.module.scss";
import $ from "jquery";

export default function Comment({ item, target }) {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const context = useContext(UserContext);
  const [commentList, setCommentList] = useState([]);

  const writeComment = (e) => {
    const response = revalidate(context) || {};
    const { accessToken, error } = response;
    axios
      .post(
        `http://localhost:8080/${target}/${id}/comment`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: accessToken,
          },
          validateStatus: false,
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          setCommentList(response.data.serializedData.comments);
          $(".comment-textarea").val("");
        }
      });
  };

  const loadComments = (e) => {
    const response = revalidate(context) || {};
    const { accessToken, error } = response;
    axios
      .get(`http://localhost:8080/${target}/${id}/comments`, {
        headers: {
          Authorization: accessToken,
        },
        validateStatus: false,
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setCommentList(response.data.serializedData.comments);
        }
      });
  };
  const RemoveCommentBtn = ({ idx }) => {};

  useEffect(() => {
    loadComments();
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
                        target={"sheeet"}
                        id={id}
                      />
                    ) : null}
                  </Col>
                </Row>
              </>
            );
          })
        ) : (
          <strong>댓글이 없습니다.</strong>
        )}
      </div>
    </div>
  );
}

function RemoveCommentBtn({ idx, context, commentListValue, target, id }) {
  const { commentList, setCommentList } = commentListValue;
  const removeComment = (e) => {
    const response = revalidate(context) || {};
    const { accessToken, error } = response;
    const commentId = commentList[idx].id;
    axios
      .delete(`http://localhost:8080/${target}/${id}/comment/${commentId}`, {
        headers: {
          Authorization: accessToken,
        },
        validateStatus: false,
        withCredentials: true,
      })
      .then((response) => {
        if (response && response.data.status === 200) {
          setCommentList(response.data.serializedData.comments);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button style={{ border: "none", color: "gray" }} onClick={removeComment}>
      삭제
    </button>
  );
}
