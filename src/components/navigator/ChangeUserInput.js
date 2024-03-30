import { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { updateUser } from "../AxiosUtil";

function CheckPassword({ registerInfo, checkPassword }) {
  if (checkPassword === "") return null;
  if (checkPassword === registerInfo.changedPassword) {
    return <Form.Text>비밀번호 인증 성공</Form.Text>;
  } else return <Form.Text>비밀번호가 다릅니다.</Form.Text>;
}
export default function ChangeUserInfo({ context, alertValue }) {
  const [updateInfo, setRegisterInfo] = useState({});
  const [checkPassword, setCheckPassword] = useState("");
  const [profileFile, setProfileFile] = useState();
  const googleSecret = process.env.REACT_APP_GOOGLE_API_SECRET;
  const [profileSrc, setProfileSrc] = useState("/img/defaultUserImg.png");
  const navigate = useNavigate();

  useEffect(() => {
    if (context.loggedUser.loginMethod === "GOOGLE") {
      setProfileSrc(
        context.loggedUser.profileSrc + `?access_token=${googleSecret}`
      );
    }
    const initialRegisterInfo = {
      username: context.loggedUser.username,
      currentPassword: "",
      changedPassword: "",
      name: context.loggedUser.name,
      email: context.loggedUser.email,
      phoneNum: "",
      loginMethod: "EMAIL",
      profileSrc: context.loggedUser.profileSrc,
    };
    setRegisterInfo(initialRegisterInfo);
  }, [context]);

  const changeProfile = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileName = file.name.split(".");
      if (fileName.length < 2) {
        alertValue.alert("danger", "invalid filename.");
        return;
      }
      setProfileSrc(URL.createObjectURL(file));
      const newFileName = `profile-${fileName[0]}-${crypto.randomUUID()}.${
        fileName[1]
      }`;
      setProfileFile(new File([file], newFileName, { type: file.type }));
      setRegisterInfo((prev) => ({ ...prev, profileSrc: newFileName }));
    }
  };
  const submitRegister = async () => {
    const registerForm = new FormData();
    registerForm.append("updateInfo", JSON.stringify(updateInfo));
    if (updateInfo.profileSrc !== "") {
      registerForm.append("profileImg", profileFile);
    }
    try {
      await updateUser(context, registerForm);
      alertValue.alert("primary", "회원정보 수정 성공");
      navigate(0);
    } catch (e) {
      alertValue.alert("danger", "회원정보 수정 실패");
      console.error(e);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center">
      <div className="d-flex w-50  p-5 ">
        <Form className="w-100">
          <Form.Group>
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={updateInfo.username || ""}
              onChange={(e) =>
                setRegisterInfo({ ...updateInfo, username: e.target.value })
              }
              required
              disabled
            />
            <Form.Text>로그인 시 사용되는 고유한 값입니다</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              id="currentPassword"
              value={updateInfo.currentPassword || ""}
              onChange={(e) => {
                setRegisterInfo({
                  ...updateInfo,
                  currentPassword: e.target.value,
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>변경할 비밀번호</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={updateInfo.changedPassword || ""}
              onChange={(e) =>
                setRegisterInfo({
                  ...updateInfo,
                  changedPassword: e.target.value,
                })
              }
              required
              disabled={updateInfo.loginMethod !== "EMAIL"}
            />
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              id="password-authetication"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
              disabled={updateInfo.loginMethod !== "EMAIL"}
            />
            <CheckPassword
              registerInfo={updateInfo}
              checkPassword={checkPassword}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>이름</Form.Label>
            <Form.Control
              id="name"
              value={updateInfo.name || ""}
              onChange={(e) =>
                setRegisterInfo({ ...updateInfo, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={updateInfo.email || ""}
              onChange={(e) =>
                setRegisterInfo({ ...updateInfo, email: e.target.value })
              }
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="phone"
              id="phoneNum"
              value={updateInfo.phoneNum || ""}
              onChange={(e) =>
                setRegisterInfo({ ...updateInfo, phoneNum: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex flex-column ">
            <Form.Label>프로필 사진</Form.Label>
            <Image
              src={updateInfo.profileSrc || "/img/defaultUserImg.png"}
              thumbnail
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              className="align-self-center"
              id="profileImg"
            />
            <Form.Control type="file" onChange={changeProfile} />
          </Form.Group>
          <Row>
            <Button className="m-2" onClick={submitRegister}>
              정보 수정하기
            </Button>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
