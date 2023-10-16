import { useLocation, useParams } from "react-router";
import Navigator from "../Navigator";
import LeftNavigator from "../LeftNavigator";
import Carousel from "react-bootstrap/Carousel";
import { genreDict } from "./GenreSelection";
import { instrumentDict } from "./InstrumentSelection";
import "bootstrap/dist/css/bootstrap.min.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User-context";
import axios from "axios";

import revalidate from "../../uitl/revalidate";

function SheetContent({ item }) {
  console.log(item);
  let filePaths = item.sheet.sheetUrl.split(",");
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;
  filePaths.map((file, idx) => {
    filePaths[idx] = `https://${bucketName}.s3.${region}.amazonaws.com/${file}`;
  });
  filePaths.pop();

  return (
    <Carousel>
      {filePaths.map((file, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100" src={file} alt="Second slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function Comment({ item }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(item.comments);
  const context = useContext(UserContext);
  const removeComment = async (event) => {
    const commentDiv = event.target.parentElement;

    const newToken = await revalidate(context.accessToken);
    console.log("newToken:", newToken);
    if (newToken !== null) {
      context.setAccessToken(newToken);
      localStorage.setItem("userState", JSON.stringify(context));
    }
    const response = await axios.delete(
      `/api/sheet/${item.id}/comment/${commentDiv.id}`,
      {
        headers: {
          Authorization: context.accessToken,
        },
      }
    );
    console.log(response);

    const removedCommentList = commentList.filter((comment) => {
      return comment.id !== parseInt(commentDiv.id);
    });
    setCommentList(removedCommentList);
  };
  const sendComment = async (event) => {
    const newToken = await revalidate(context.accessToken);
    if (newToken !== null) {
      context.setAccessToken(newToken);
      localStorage.setItem("userState", JSON.stringify(context));
    }
    const response = await axios.post(
      `/api/sheet/${item.id}/comment`,
      { content: comment },
      {
        headers: {
          Authorization: context.accessToken,
        },
      }
    );
    console.log(response);
    if (response.data.status === 200) {
      setCommentList(response.data.serializedData.comments);
    }
  };

  return (
    <div className="comment form">
      <div className="input">
        <textarea
          placeholder="댓글을 작성하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={sendComment}>댓글 쓰기</button>
      </div>
      <div className="comments">
        {commentList.map((comment, idx) => (
          <div className="comment" key={comment.id} id={comment.id}>
            <div className="sheet-info" id="author">
              <img src={item.author.profileSrc} />
              <span className="user-name">{item.author.name}</span>
            </div>
            <div className="sheet-info content">{comment.content}</div>
            <button onClick={removeComment}>삭제</button>
            <button>수정</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SheetInfo() {
  const { id } = useParams();

  const [sheetPost, setSheetPost] = useState();
  const context = useContext(UserContext);
  let genreList = [];

  useEffect(() => {
    async function b() {
      const response = await axios.get(`/api/sheet/${id}`);
      if (response.data.status === 200) {
        setSheetPost(response.data.serializedData.sheetPost);
        genreList = Object.values(
          response.data.serializedData.sheetPost.sheet.genres
        ).map((genre) => genreDict[genre]);
      }
    }
    async function c() {
      await b();
    }
    c();
  }, []);

  if (sheetPost !== undefined) {
    return (
      <div>
        <Navigator />
        <div>
          <LeftNavigator />
          <div>
            <div className="sheet-info" id="article">
              <div className="sheet-info" id="title">
                title:{sheetPost.title}
              </div>
              <div className="sheet-info" id="author">
                <img src={sheetPost.author.profileSrc} />
                <span className="user-name">{sheetPost.author.name}</span>
              </div>
              <div className="sheet-info" id="view-count">
                조회수:{sheetPost.viewCount}
              </div>
              <SheetContent item={sheetPost} />
              <div dangerouslySetInnerHTML={{ __html: sheetPost.content }} />
              <div className="sheet-info" id="metadata">
                <div id="price">
                  {sheetPost.price === 0 ? "무료" : sheetPost.price}
                </div>
                <span id="genre">
                  genres:
                  {genreList.map((genre, key) => (
                    <span key={key}>{genre}</span>
                  ))}
                </span>
                <span id="sheet-title">title:{sheetPost.sheet.title}</span>
                <span id="difficulty">난이도:{sheetPost.sheet.difficulty}</span>
                <span id="instrument">
                  악기:{instrumentDict[sheetPost.sheet.instrument]}
                </span>
                <span id="lyrics">
                  가사:{sheetPost.sheet.lyrics ? "가사 없음" : "가사 있음"}
                </span>
                <span id="solo">{sheetPost.sheet.solo ? "솔로" : "듀엣"}</span>
                <span id="page-num">{sheetPost.sheet.pageNum}</span>
              </div>
            </div>
            <div className="sheet-info scrap like">
              <span id="scrap-count">scrap</span>
              <span id="like-count">like{sheetPost.likeCount}</span>
            </div>
            <div className="sheet-info comment">
              <Comment item={sheetPost} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SheetInfo;
