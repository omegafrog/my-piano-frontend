import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { decodeToken } from "react-jwt";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const syncUserInfo = (accessToken) => {
    axios
      .get("http://localhost:8080/user", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setState((prev) => ({
            ...prev,
            loggedUser: response.data.serializedData.user,
            loggedIn: true,
            accessToken: accessToken,
          }));
        }
      });
  };

  const setPushNotification = (boolean) => {
    setState((prevState) => ({
      ...prevState,
      pushNotification: boolean,
    }));
  };
  const setLoggedUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: data,
    }));
  };

  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: !prevState.loggedIn,
    }));
  };
  const setAccessToken = (token) => {
    setState((prevState) => ({
      ...prevState,
      accessToken: token,
    }));
  };
  const initialize = () => {
    setState((prev) => ({
      ...prev,
      loggedUser: {},
      loggedIn: false,
      accessToken: "",
    }));
  };

  const initialState = {
    loggedUser: {},
    loggedIn: false,
    accessToken: "",
    pushNotification: false,
    setLoggedUser,
    setLoggedIn,
    setAccessToken,
    initialize,
    setPushNotification,
    syncUserInfo,
  };

  const [state, setState] = useState(
    sessionStorage.getItem("userState") &&
      JSON.parse(sessionStorage.getItem("userState")).loggedIn === true &&
      Date.now() / 1000 <
        decodeToken(JSON.parse(sessionStorage.getItem("userState")).accessToken)
          .exp
      ? {
          ...JSON.parse(sessionStorage.getItem("userState")),
          setLoggedIn,
          setLoggedUser,
          setAccessToken,
          initialize,
          setPushNotification,
          syncUserInfo,
        }
      : initialState
  );
  // state가 변경되면 sessionStorage에 자동으로 저장됨
  useEffect(() => {
    console.log("state change", state);
    if (state !== sessionStorage.getItem("userState")) {
      sessionStorage.setItem("userState", JSON.stringify(state));
    }
  }, [state]);
  const value = useMemo(() => state, [state]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
