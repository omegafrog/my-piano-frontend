import axios from "axios";
import { parse } from "path-browserify";
import React, { useEffect, useMemo, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const syncUserInfo = async (accessToken) => {
    const response = await axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: accessToken,
      },
    });
    if (response && response.status === 200 && response.data.status === 200) {
      sessionStorage.setItem(
        "userState",
        JSON.stringify({
          loggedUser: response.data.data,
          loggedIn: true,
          accessToken: accessToken,
        })
      );
      setState((prev) => ({
        ...prev,
        loggedUser: response.data.data,
        loggedIn: true,
        accessToken: accessToken,
      }));
    }
  };
  const syncAdminInfo = async (accessToken) => {
    const response = await axios.get("http://localhost:8080/admin", {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(response);
    if (response && response.status === 200 && response.data.status === 200) {
      sessionStorage.setItem(
        "userState",
        JSON.stringify({
          loggedUser: response.data.data,
          loggedIn: true,
          accessToken: accessToken,
        })
      );
      setState((prev) => ({
        ...prev,
        loggedUser: response.data.data,
        loggedIn: true,
        accessToken: accessToken,
      }));
    }
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
    syncAdminInfo,
  };

  const [state, setState] = useState(
    sessionStorage.getItem("userState") &&
      JSON.parse(sessionStorage.getItem("userState")).loggedIn === true
      ? {
          ...JSON.parse(sessionStorage.getItem("userState")),
          setLoggedIn,
          setLoggedUser,
          setAccessToken,
          initialize,
          setPushNotification,
          syncUserInfo,
          syncAdminInfo,
        }
      : initialState
  );
  // state가 변경되면 sessionStorage에 자동으로 저장됨
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userState")) === null) {
      sessionStorage.setItem("userState", JSON.stringify(initialState));
    }
    const parsed = JSON.parse(sessionStorage.getItem("userState"));
    if (
      state.accessToken !== parsed.accessToken ||
      state.loggedIn !== parsed.loggedIn ||
      state.loggedUser !== parsed.loggedUser ||
      state.pushNotification !== parsed.pushNotification
    ) {
      sessionStorage.setItem("userState", JSON.stringify(state));
    }
  }, [state]);
  const value = useMemo(() => state, [state]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export class APIError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
