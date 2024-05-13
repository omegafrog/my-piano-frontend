import { useContext, useEffect, useState } from "react";
import CustomAlert from "./alert/CustomAlert";
import { getToken } from "firebase/messaging";
import Navigator from "./Navigator";
import { UserContext } from "../context/User-context";
import { messaging } from "./../firebase";
import { subscribeNoti, validate } from "./AxiosUtil";
import { LoginError } from "../util/revalidate";

export default function Layout({ alertValue, children, leftNav }) {
  const context = useContext(UserContext);

  const grantPushNotification = () => {
    if (context.pushNotification === true) return;
    console.log("messaging:", messaging);
    getToken(messaging).then((token) => {
      subscribeNoti(context, token);
    });
  };
  useEffect(() => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    // Your web app's Firebase configuration

    if (context.loggedIn) {
      if (
        context.loggedUser.role !== "ADMIN" ||
        context.loggedUser.role !== "SU_ADMIN"
      ) {
        if (Notification.permission === "granted") {
          grantPushNotification();
        } else {
          Notification.requestPermission().then((result) => {
            if (result === "granted") grantPushNotification();
          });
        }
      }
    }

    // Add the public key generated from the console here.
    // const message = getMessaging(app);
    // console.log(message);
    // send message
  }, []);

  return (
    <div className="w-100">
      <Navigator />
      <div className="d-flex h-100">
        <CustomAlert />
        {leftNav}
        {children}
      </div>
    </div>
  );
}
