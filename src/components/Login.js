import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext, syncUserInfo } from "./User-context";
import { useNavigate } from "react-router";
import { Button, Form, Modal } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";

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
    const response = await axios.post(url, form, { withCredential: true });
    if (response.data.status !== 200) {
      alert("로그인 실패");
    } else {
      console.log(response.data);
      const accessToken = response.data.data["access token"];
      console.log("accessToken:", accessToken);
      context.syncUserInfo(accessToken);
    }
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
            const response = await axios.post(
              "http://localhost:8080/oauth2/google",
              {
                code: credentialResponse.credential,
              }
            );
            if (response.data.status === 302) {
              const initialRegisterInfo = response.data.data.userInfo;
              navigate("/user/register", { state: initialRegisterInfo });
            } else if (response.data.status === 200) {
              console.log("로그인 성공");
              console.log("response.data", response.data);
              context.syncUserInfo();
            } else if (response.data.status === 403) {
              console.log("로그인 실패");
              alert(response.data.message);
              handleClose();
            }
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
