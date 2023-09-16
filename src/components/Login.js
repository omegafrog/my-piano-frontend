import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./User-context";
import { useNavigate } from "react-router";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const url = "/api/user/login";

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
      const accessToken = response.data.serializedData["access token"];
      const userInfoResponse = await axios.get("/api/user", {
        headers: {
          Authorization: accessToken,
        },
      });
      context.setAccessToken(accessToken);
      context.setLoggedIn(true);
      context.setLoggedUser(userInfoResponse.data.serializedData.user);
    }
  };
  const navigate = useNavigate();
  const submitLogin = (event) => {
    event.preventDefault();
    getLoginInfo();
  };

  useEffect(() => {
    if (context.accessToken !== "") {
      sessionStorage.setItem("userState", JSON.stringify(context));
      navigate("/main");
    }
  }, [context.accessToken]);

  return (
    <form onSubmit={submitLogin}>
      <input
        placeholder="Username"
        id="username"
        value={loginInfo.username}
        onChange={getUsername}
      />
      <input
        placeholder="Password"
        id="password"
        value={loginInfo.password}
        onChange={getPassword}
      />
      <button>Login</button>
    </form>
  );
}

export default Login;
