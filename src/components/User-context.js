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

  let initialState = {
    loggedUser: {},
    loggedIn: false,
    accessToken: "",
    setLoggedUser,
    setLoggedIn,
    setAccessToken,
  };

  if (localStorage.getItem("userState") !== null) {
    initialState = JSON.parse(localStorage.getItem("userState"));
  }
  const [state, setState] = useState(initialState);
  console.log(state);
  useEffect(() => console.log("state change", state), [state]);
  const value = useMemo(() => state, [state]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
