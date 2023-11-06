import { Button } from "react-bootstrap";
import revalidate from "../util/revalidate";
import { useContext, useEffect } from "react";
import { UserContext } from "./User-context";
import axios from "axios";

export default function LikeBtn({ target, id, value }) {
  const context = useContext(UserContext);
  const [state, setState] = value;
  // check this post is liked
  useEffect(() => {
    const response = revalidate(context) || {};
    const { accessToken, error } = response;
    if (accessToken) {
      axios
        .get(`http://localhost:8080/${target}/${id}/like`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          if (response.data.serializedData.isLiked === true) {
            const likeBtn = document.querySelector("#like-count");
            likeBtn.classList.add("active");
          }
        });
    }
  }, []);
  return (
    <Button
      id="like-count"
      variant="outline-primary"
      onClick={(e) => toggleLike(context, target, id, setState)}
    >
      ❤️<span>{state.likeCount}</span>
    </Button>
  );
}

function toggleLike(context, target, id, setState) {
  let result = revalidate(context) || {};
  const { accessToken, error } = result;
  const likeBtn = document.querySelector("#like-count");
  if (!likeBtn.classList.contains("active")) {
    axios
      .put(`http://localhost:8080/${target}/${id}/like`, null, {
        validateStatus: false,
        withCredentials: true,
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log("success");
          setState((prev) => ({
            ...prev,
            likeCount: prev.likeCount + 1,
          }));
          likeBtn.style.backgroundColor = "#74b9ff";
          likeBtn.classList.add("active");
        }
      })
      .catch((error) => {
        console.log("예상하지 못한 에러입니다.");
        console.log("error:", error);
      });
  } else {
    axios
      .delete(`http://localhost:8080/${target}/${id}/like`, {
        validateStatus: false,
        withCredentials: true,
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setState((prev) => ({
            ...prev,
            likeCount: prev.likeCount - 1,
          }));
          likeBtn.style.backgroundColor = "white";
          likeBtn.classList.remove("active");
        }
      });
  }
}
