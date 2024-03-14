import { Button, Container, Table } from "react-bootstrap";
import Layout from "../Layout";
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../AxiosUtil";
import { UserContext } from "../User-context";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import "./postList.css";
import CustomPagenation from "../Pagenation";
import queryString from "query-string";

export function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  const [paginationEnd, setPaginationEnd] = useState(0);
  const [pageable, setPageable] = useState({ page: 0, size: 10 });
  useEffect(() => {
    async function a() {
      console.log("search:", search);
      const { size = 10, page = 0 } = queryString.parse(search);
      //   const size = search.size ? search.size : 10;
      //   const page = search.page ? search.page : 0;
      console.log("page, size:", page, size);
      if (search.page !== undefined && search.size !== undefined) {
        setPageable({ page: page, size: size });
      }
      const data = await getPosts({
        page: page,
        size: size,
      });
      setPosts(data.data.postListDtos);
      setPaginationEnd(
        data.data.totalPostCount % size === 0
          ? data.data.totalPostCount / size
          : parseInt(data.data.totalPostCount / size) + 1
      );
    }
    a();
  }, [search]);
  return (
    <Layout>
      <Container className="w-75 my-5 d-flex flex-column align-items-center">
        <div className="w-100">
          <Button variant="outline-primary" onClick={() => navigate("write")}>
            글쓰기
          </Button>
          <Table>
            <thead>
              <tr>
                <td></td>
                <td className="title">제목</td>
                <td className="author-name">글쓴이</td>
                <td className="view-count">조회수</td>
                <td className="created-at">일자</td>
              </tr>
            </thead>
            <tbody
              className="notice"
              style={{
                backgroundColor: "#b2bec3",
              }}
            ></tbody>
            <tbody className="contents">
              {posts.map((post, idx) => {
                return (
                  <tr key={idx} onClick={() => navigate(`/post/${post.id}`)}>
                    <td>{post.id}</td>
                    <td className="title">{post.title}</td>
                    <td className="author-name">{post.authorName}</td>
                    <td className="view-count">{post.viewCount}</td>
                    <td className="created-at">
                      {post.createdAt[0]}.{post.createdAt[1]}.
                      {post.createdAt[2]} {post.createdAt[3]}:
                      {post.createdAt[4]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <CustomPagenation
          pageable={pageable}
          endNum={paginationEnd}
          pageBtnSize={5}
        />
      </Container>
    </Layout>
  );
}
