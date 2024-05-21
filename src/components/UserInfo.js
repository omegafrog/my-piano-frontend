import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User-context";
import styles from "../css/UserInfo.module.css";

function UserInfo() {
  const { loggedUser } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState("/img/defaultUserImg.png");
  useEffect(() => {
    if (loggedUser.profileSrc && loggedUser.profileSrc !== "")
      setUserProfile(`${loggedUser.profileSrc}`);
  }, []);

  return (
    <img className={styles.Profile} src={userProfile} alt="user profile" />
  );
}
export default UserInfo;
