import { Button, Col, Container, FormControl, Row } from "react-bootstrap";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User-context";
import Editor from "../sheet/editor";
import { updatePost, getPost, deletePost } from "../AxiosUtil";

export default function EditPost() {
  const { id } = useParams();
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    async function a() {
      const data = await getPost(context, id);
      setData({
        title: data.title,
        content: data.content,
      });
      setLoading(true);
    }
    a();
  }, []);

  return (
    <Layout>
      <Container fluid className="w-75">
        {loading === true ? (
          <>
            <h3>글 수정하기</h3>
            <FormControl
              placeholder="제목"
              className="my-3"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            ></FormControl>
            <Editor
              content={data.content}
              setContent={(d) => {
                setData((prev) => ({
                  ...prev,
                  content: d,
                }));
              }}
              height={"700px"}
            ></Editor>
            <div className="d-flex justify-content-between">
              <Button
                onClick={() => {
                  try {
                    updatePost(context, id, data);
                    navigate(`/post/${id}`);
                  } catch (error) {
                    console.log(error.message);
                  }
                }}
              >
                수정하기
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  try {
                    deletePost(context, id);
                    alert("글이 삭제되었습니다.");
                    navigate("/post");
                  } catch (error) {
                    console.log(error.message);
                  }
                }}
              >
                삭제하기
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </Container>
    </Layout>
  );
}
