import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/User-context";
import { checkIsLiked, dislikePost, isLikedPost, likePost } from "./AxiosUtil";
import { LoginError } from "../util/revalidate";
import { useNavigate } from "react-router";
import { AlertContext } from "../context/AlertContext";

export default function LikeBtn({ target, id, value }) {
  const context = useContext(UserContext);
  const [state, setState] = value;
  const alertValue = useContext(AlertContext);
  // check this post is liked
  useEffect(() => {
    async function invoke() {
      if (context.loggedIn === true) {
        if (
          context.loggedUser.role === "USER" ||
          context.loggedUser.role === "CREATOR"
        ) {
          const likedPostData = await isLikedPost(context, target, id);
          if (likedPostData.isLiked === true) {
            const likeBtn = document.querySelector("#like-count");
            likeBtn.style.backgroundColor = "#74b9ff";
            likeBtn.classList.toggle("active");
          }
        }
      }
    }
    invoke();
  }, [context]);

  async function toggleLike(context, target, id, setState) {
    const likeBtn = document.querySelector("#like-count");
    if (!likeBtn.classList.contains("active")) {
      try {
        await likePost(context, target, id);
        console.log("success");
        setState((prev) => ({
          ...prev,
          likeCount: prev.likeCount + 1,
        }));
        likeBtn.style.backgroundColor = "#74b9ff";
        likeBtn.classList.add("active");
      } catch (e) {
        if (e instanceof LoginError) {
          console.error(e);
          alertValue.alert("danger", "올바르지 않은 접근입니다");
        }
      }
    } else {
      try {
        await dislikePost(context, target, id);
        setState((prev) => ({
          ...prev,
          likeCount: prev.likeCount - 1,
        }));
        likeBtn.style.backgroundColor = "white";
        likeBtn.classList.remove("active");
      } catch (e) {
        if (e instanceof LoginError) {
          console.error(e);
          alert("로그인이 필요합니다.");
          context.initialize();
        }
      }
    }
  }
  return (
    <Button
      id="like-count"
      variant="outline-primary"
      disabled={
        context.loggedIn === true &&
        (context.loggedUser.role === "ADMIN" ||
          context.loggedUser.role === "SUPER_ADMIN")
      }
      onClick={(e) => toggleLike(context, target, id, setState)}
    >
      ❤️<span>{state.likeCount}</span>
    </Button>
  );
}
