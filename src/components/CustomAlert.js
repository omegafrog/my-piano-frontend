import { useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function CustomAlert({ variant, value }) {
  useEffect(() => {
    if (value.showAlert.state === true) {
      setTimeout(() => {
        value.setShowAlert({ state: false, text: "" });
      }, 3000);
    }
  }, [value.showAlert]);
  return (
    <div
      className="fixed-top  d-flex justify-content-end "
      style={{ top: "75px" }}
    >
      <Alert
        transition={false}
        show={value.showAlert.state}
        key={variant}
        variant={variant}
        className="m-3"
      >
        {value.showAlert.text}
      </Alert>
    </div>
  );
}
