import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";

export default function useCustomAlert() {
  const [showAlert, setShowAlert] = useState({ state: false, text: "" });
  
  return <CustomAlert showAlert={showAlert} />;
}
