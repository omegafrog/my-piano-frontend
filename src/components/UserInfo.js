import { useContext, useEffect, useState } from "react";
import { UserContext } from "./User-context";
import styles from "../css/UserInfo.module.css";

function UserInfo() {
  const { loggedUser } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState("/img/defaultUserImg.png");
  useEffect(() => {
    if (loggedUser.profileSrc !== "") setUserProfile(loggedUser.profileSrc);
  }, []);

  return (
    <img className={styles.Profile} src={userProfile} alt="user profile" />
  );
}
export default UserInfo;
