import React, { useEffect, useMemo, useState } from "react";
import { getNoti } from "../components/AxiosUtil";

export const NotiContext = React.createContext();

export function NotiProvider({ children }) {
  const setNotification = (array) => {
    setState((prev) => ({
      ...prev,
      notices: array,
    }));
  };
  const deleteNotification = (id) => {
    const notices = state.notices.filter((item) => item.id !== id);
    setState((prev) => ({
      ...prev,
      notices: notices,
    }));
  };
  const getNotification = async (context) => {
    try {
      const notices = await getNoti(context);
      setState((prev) => ({
        ...prev,
        notices: notices,
      }));
    } catch (e) {
      console.error(e);
    }
  };
  const initNotification = () => {
    setState((prev) => ({
      ...prev,
      notices: [],
    }));
  };

  const [state, setState] = useState({
    notices: [],
    setNotification,
    deleteNotification,
    getNotification,
    initNotification,
  });
  useEffect(() => {
    console.log(state);
  }, [state]);
  const value = useMemo(() => state, [state]);
  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
}
