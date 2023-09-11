import { useContext } from "react";
import { UserContext } from "./User-context";

function UserInfo() {
  const { loggedUser } = useContext(UserContext);
  // TODO : Iframe으로 유저 이름, 마이페이지,스크랩,로그아웃 버튼 띄우기
  return (
    <div>
      <img src={loggedUser.profileSrc} alt="user profile image" />;
    </div>
  );
}
export default UserInfo;
