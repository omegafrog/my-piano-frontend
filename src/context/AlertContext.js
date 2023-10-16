import React, { useMemo, useState } from "react";

export const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const setVariant = () =>
    setState((prev) => ({ ...prev, variant: prev.variant }));
  const setText = () => setState((prev) => ({ ...prev, text: prev.text }));
  const initialAlertConfig = {
    variant: "danger",
    text: "",
    setVariant,
    setText,
  };
  const [state, setState] = useState(initialAlertConfig);
  const value = useMemo(() => state, [state]);

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
