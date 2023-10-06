import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Image, Row } from "react-bootstrap";
import CustomAlert from "./CustomAlert";

function CheckPassword({ registerInfo, checkPassword }) {
  if (checkPassword === "") return null;
  if (checkPassword === registerInfo.password) {
    return <Form.Text>비밀번호 인증 성공</Form.Text>;
  } else return <Form.Text>비밀번호가 다릅니다.</Form.Text>;
}

function Register() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialRegisterInfo =
    state === null
      ? {
          username: "",
          password: "",
          name: "",
          email: "",
          phoneNum: "",
          loginMethod: "EMAIL",
          profileSrc: "",
        }
      : state;
  const [registerInfo, setRegisterInfo] = useState(initialRegisterInfo);
  const [checkPassword, setCheckPassword] = useState("");
  const [profileSrc, setProfileSrc] = useState("/img/defaultUserImg.png");
  const [showAlert, setShowAlert] = useState({ state: false, text: "" });
  const [profileFile, setProfileFile] = useState();
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = process.env.REACT_APP_REGION;

  const changeProfile = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileName = file.name.split(".");
      if (fileName.length < 2) {
        setShowAlert({ state: true, text: "invalid filename." });
        return;
      }
      setProfileSrc(URL.createObjectURL(file));
      const newFileName = `https://${bucketName}.s3.${region}.amazonaws.com/profile-${
        fileName[0]
      }-${crypto.randomUUID()}.${fileName[1]}`;
      setProfileFile(new File([file], newFileName, { type: file.type }));
      setRegisterInfo((prev) => ({ ...prev, profileSrc: newFileName }));
    }
  };

  const requestRegister = async () => {
    const registerForm = new FormData();
    registerForm.append("registerInfo", JSON.stringify(registerInfo));
    registerForm.append("profileImg", profileFile);
    console.log(profileFile);
    console.log(registerForm.get("profileImg"));
    const res = await axios({
      method: "post",
      url: "/api/user/register",
      withCredentials: true,
      data: registerForm,
    });
    console.log(res);
    // if (res === null) {
    //   return;
    // }
    // if (res.data.status >= 400) {
    //   alert(res.data.message);
    // } else {
    //   console.log(res);
    //   const fileRes = await axios({
    //     method: "post",
    //     url: "/api/user/profile/register",
    //     withCredentials: true,
    //     data: profileForm,
    //   });
    //   console.log(fileRes);
    //   if (fileRes.data.status === 200) navigate("/main");
    // }
  };
  const submitRegister = (event) => {
    event.preventDefault();
    requestRegister();
  };

  return (
    <div
      className="d-flex w-50 justify-content-center p-5 align-self-center"
      style={{ backgroundColor: "#ecf0f1" }}
    >
      <CustomAlert showAlert={showAlert} />
      <Form className="w-100">
        <Form.Group>
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={registerInfo.username || ""}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, username: e.target.value })
            }
            required
          />
          <Form.Text>로그인 시 사용되는 고유한 값입니다</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={registerInfo.password || ""}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password: e.target.value })
            }
            required
            disabled={registerInfo.loginMethod !== "EMAIL"}
          />
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            id="password-authetication"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            required
            disabled={registerInfo.loginMethod !== "EMAIL"}
          />
          <CheckPassword
            registerInfo={registerInfo}
            checkPassword={checkPassword}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>이름</Form.Label>
          <Form.Control
            id="name"
            value={registerInfo.name || ""}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={registerInfo.email || ""}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="phone"
            id="phoneNum"
            value={registerInfo.phoneNum || ""}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, phoneNum: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex flex-column ">
          <Form.Label>프로필 사진</Form.Label>
          <Image
            src={profileSrc}
            thumbnail
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
            className="align-self-center"
            id="profileImg"
          />
          <Form.Control type="file" onChange={changeProfile} />
        </Form.Group>
        <Row>
          <Button className="m-2" onClick={submitRegister}>
            회원 가입하기
          </Button>
          <Button
            className="m-2"
            variant="secondary"
            onClick={() => {
              navigate("/main");
            }}
          >
            홈으로
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Register;
