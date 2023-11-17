import { useContext, useEffect } from "react";
import CustomAlert from "./CustomAlert";
import LeftNavigator from "./LeftNavigator";
import Navigator from "./Navigator";
import { UserContext } from "./User-context";
import axios from "axios";

export default function Layout({ alertValue, children, leftNav }) {
  const context = useContext(UserContext);

  const validate = () => {
    if (context.loggedIn === true) {
      axios
        .get("http://localhost:8080/validate", {
          headers: {
            Authorization: context.accessToken,
          },
          withCredentials: true,
          validateStatus: false,
        })
        .then((response) => {
          if (response.data.status !== 200) {
            alert("로그인이 만료되었습니다.");
            context.initialize();
          }
          context.syncUserInfo(context.accessToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    validate();
  }, []);
  return (
    <div className="w-100">
      <Navigator />
      <div className="d-flex h-100">
        <CustomAlert variant={"danger"} value={alertValue} />
        {leftNav ? <LeftNavigator /> : null}
        {children}
      </div>
    </div>
  );
}
