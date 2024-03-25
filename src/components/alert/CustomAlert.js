import { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { AlertContext } from "../../context/AlertContext";

import styles from "./Alert.module.scss";

export default function CustomAlert() {
  const alertContext = useContext(AlertContext);
  return (
    <div
      className="fixed-top  d-flex justify-content-end "
      style={{ top: "75px" }}
    >
      <Alert
        transition={true}
        show={alertContext.show}
        key={alertContext.variant}
        variant={alertContext.variant}
        className={`m-3 ${styles.alert}`}
      >
        {alertContext.text}
      </Alert>
    </div>
  );
}
