import React, { useEffect, useMemo, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
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
    setState(initialState);
  };
  let initialState = {
    loggedUser: {},
    loggedIn: false,
    accessToken: "",
    setLoggedUser,
    setLoggedIn,
    setAccessToken,
    initialize,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem("userState") !== null) {
      setState({
        ...JSON.parse(localStorage.getItem("userState")),
        setLoggedIn,
        setLoggedUser,
        setAccessToken,
        initialize,
      });
    }
  }, []);

  // state가 변경되면 localStorage에 자동으로 저장됨
  useEffect(() => {
    console.log("state change", state);
    localStorage.setItem("userState", JSON.stringify(state));
  }, [state]);
  const value = useMemo(() => state, [state]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
