import { useMemo, useState } from "react";

export default function useAlert() {
  const [showAlert, setShowAlert] = useState({ state: false, text: "" });
  const value = useMemo(
    () => ({ showAlert, setShowAlert }),
    [showAlert, setShowAlert]
  );
  return value;
}
