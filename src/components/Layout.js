import { useContext, useEffect } from "react";
import CustomAlert from "./CustomAlert";
import LeftNavigator from "./LeftNavigator";
import { getApp, initializeApp } from "firebase/app";
import { getToken } from "firebase/messaging";
import Navigator from "./Navigator";
import { UserContext } from "./User-context";
import axios from "axios";
import { messaging } from "./../firebase";

export default function Layout({ alertValue, children, leftNav }) {
  const context = useContext(UserContext);

  const grantPushNotification = () => {
    if (context.pushNotification === true) return;
    console.log("messaging:", messaging);
    getToken(messaging).then((token) => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}/notification/token`,
          { token: token },
          {
            headers: {
              Authorization: context.accessToken,
            },
          }
        )
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.data.status === 200
          ) {
            console.log("token 전송 성공");
            context.setPushNotification(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  useEffect(() => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration

    if (context.loggedIn) {
      if (Notification.permission === "granted") {
        grantPushNotification();
      } else {
        Notification.requestPermission().then((result) => {
          if (result === "granted") grantPushNotification();
        });
      }
    }

    // Add the public key generated from the console here.
    // const message = getMessaging(app);
    // console.log(message);
    // send message
    // axios.post(`http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/`)
  }, []);

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
        {leftNav}
        {children}
      </div>
    </div>
  );
}
