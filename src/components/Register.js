import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Register() {
  const url = "/api/user/register";
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialRegisterInfo = state;
  const [registerInfo, setRegisterInfo] = useState(initialRegisterInfo);
  const [checkPassword, setCheckPassword] = useState("");
  const [response, setResponse] = useState(null);

  const setUsername = (event) => {
    setRegisterInfo({ ...registerInfo, username: event.target.value });
  };
  const setPassword = (event) => {
    setRegisterInfo({ ...registerInfo, password: event.target.value });
  };
  const setPasswordCheck = (event) => {
    setCheckPassword(event.target.value);
  };
  const setName = (event) => {
    setRegisterInfo({ ...registerInfo, name: event.target.value });
  };
  const setEmail = (event) => {
    setRegisterInfo({ ...registerInfo, email: event.target.value });
  };
  const setLoginMethod = (event) => {
    setRegisterInfo({ ...registerInfo, username: event.target.value });
  };
  const setProfileSrc = (event) => {
    setRegisterInfo({ ...registerInfo, username: event.target.value });
  };
  const setPhoneNum = (event) => {
    setRegisterInfo({ ...registerInfo, phoneNum: event.target.value });
  };
  const requestRegister = async () => {
    const res = await axios.post(url, registerInfo);
    setResponse(res);
  };
  const submitRegister = (event) => {
    event.preventDefault();
    requestRegister();
  };
  useEffect(() => {
    if (response === null) {
      return;
    }
    if (response.data.status >= 400) {
      alert(response.data.message);
    } else {
      navigate("/main");
    }
  }, [response]);

  return (
    <div>
      <form onSubmit={submitRegister}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={registerInfo.username || ""}
            onChange={setUsername}
            required
          />
        </div>

        <div className="div-password-check">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={registerInfo.password || ""}
            onChange={setPassword}
            required
            disabled={registerInfo.loginMethod === "GOOGLE"}
          />
          <br />
          <label htmlFor="password-authentication">
            password-authentication
          </label>
          <input
            type="password"
            id="password-authetication"
            value={checkPassword}
            onChange={setPasswordCheck}
            required
            disabled={registerInfo.loginMethod === "GOOGLE"}
          />
          <br></br>
          {registerInfo.password === checkPassword ? (
            <span id="password-check-success">
              비밀번호 인증에 성공했습니다.
            </span>
          ) : (
            <span id="password-check-fail">비밀번호가 다릅니다.</span>
          )}
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            value={registerInfo.name || ""}
            onChange={setName}
            required
          />
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={registerInfo.email || ""}
            onChange={setEmail}
          />
        </div>
        <div>
          <label htmlFor="phoneNum">phoneNum</label>
          <input
            type="phone"
            id="phoneNum"
            value={registerInfo.phoneNum || ""}
            onChange={setPhoneNum}
            required
          />
        </div>
        <div className="profile-submit">프로필 사진 등록 div</div>
        <button>회원 가입하기</button>
      </form>
    </div>
  );
}

export default Register;
