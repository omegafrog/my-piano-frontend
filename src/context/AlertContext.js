import React, { useMemo, useState } from "react";

export const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const alert = (variant, text) => {
    setState({ variant: variant, text: text, show: true, alert, off });
    clearTimeout();
    setTimeout(() => {
      off();
    }, 3000);
  };
  const off = () => setState((prev) => ({ ...prev, show: false }));
  const initialAlertConfig = {
    variant: "danger",
    text: "",
    show: false,
    alert,
    off,
  };
  const [state, setState] = useState(initialAlertConfig);
  const value = useMemo(() => state, [state]);

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
