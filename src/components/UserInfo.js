import { useContext } from "react";
import { UserContext } from "./User-context";
import styles from "../css/UserInfo.module.css";

function UserInfo() {
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;
  const { loggedUser } = useContext(UserContext);
  let userProfile = "";
  userProfile = loggedUser.profileSrc;
  if (userProfile.startsWith("https://")) {
    userProfile = loggedUser.profileSrc;
  } else {
    userProfile = `https://${bucketName}.s3.${region}.amazonaws.com/${loggedUser.profileSrc}`;
  }
  // TODO : Iframe으로 유저 이름, 마이페이지,스크랩,로그아웃 버튼 띄우기
  return (
    <img className={styles.Profile} src={userProfile} alt="user profile" />
  );
}
export default UserInfo;
