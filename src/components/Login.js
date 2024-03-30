import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./User-context";
import { useNavigate } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "./AxiosUtil";

function Login({ show, handleClose }) {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const url = "http://localhost:8080/user/login";

  const context = useContext(UserContext);

  const getUsername = (event) => {
    setLoginInfo({ ...loginInfo, username: event.target.value });
  };
  const getPassword = (event) => {
    setLoginInfo({ ...loginInfo, password: event.target.value });
  };
  const getLoginInfo = async () => {
    let form = new FormData();
    form.append("username", loginInfo.username);
    form.append("password", loginInfo.password);
    login(context, form);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (context.accessToken !== "") {
      sessionStorage.setItem("userState", JSON.stringify(context));
      navigate("/main");
    }
  }, [context.accessToken]);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Body className="d-grid gap-2">
        <Form className="d-grid gap-2">
          <Form.Control
            placeholder="Username"
            id="username"
            value={loginInfo.username}
            onChange={getUsername}
          />
          <Form.Control
            placeholder="Password"
            id="password"
            value={loginInfo.password}
            onChange={getPassword}
          />
          <Button
            onClick={() => {
              getLoginInfo();
            }}
          >
            Login
          </Button>
        </Form>

        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            googleLogin(context, navigate, credentialResponse, handleClose);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default Login;
