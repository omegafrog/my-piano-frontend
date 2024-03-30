import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserContext } from "./User-context";
import { checkIsLiked, likePost } from "./AxiosUtil";

export default function LikeBtn({ target, id, value }) {
  const context = useContext(UserContext);
  const [state, setState] = value;
  // check this post is liked
  useEffect(() => {
    checkIsLiked(context, target, id);
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
  const likeBtn = document.querySelector("#like-count");
  if (!likeBtn.classList.contains("active")) {
  } else {
    likePost(context, target, likeBtn, id, setState);
  }
}
