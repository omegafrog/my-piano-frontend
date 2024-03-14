import { Button, Container, Form, FormControl } from "react-bootstrap";
import Layout from "../Layout";
import Editor from "../sheet/editor";
import { useContext, useState } from "react";
import { writePost } from "../AxiosUtil";
import { UserContext } from "../User-context";
import { useNavigate } from "react-router";

import "./Editor.css";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const submitPost = async () => {
    const body = { title: title, content: content };
    const result = await writePost(context, body);
    if (result.status === 200 && result.data.status === 200) {
      navigate("/post");
    }
  };
  return (
    <Layout>
      <Container className="w-75 my-5">
        <FormControl
          placeholder="제목"
          className="my-3"
          onChange={(e) => setTitle(e.target.value)}
        ></FormControl>
        <Editor
          content={content}
          setContent={setContent}
          height={"700px"}
        ></Editor>
        <Button onClick={() => submitPost()}>게시하기</Button>
      </Container>
    </Layout>
  );
}
