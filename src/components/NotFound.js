import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      Not found
      <Link to={"/main"}>메인으로 돌아가기</Link>
    </div>
  );
}
