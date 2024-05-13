import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  navigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <h3>Not found</h3>
      <Link to={"/main"}>메인으로 돌아가기</Link>
    </div>
  );
}
