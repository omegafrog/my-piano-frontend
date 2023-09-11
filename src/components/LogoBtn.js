import { Link } from "react-router-dom";

function LogoBtn() {
  return (
    <div>
      <Link to="/main">
        <img src="img/logo-ko.png" alt="로고 이미지" />
      </Link>
    </div>
  );
}
export default LogoBtn;
