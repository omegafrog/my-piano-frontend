import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { adminLogin } from "../AxiosUtil";
import { UserContext } from "../../context/User-context";
import { LoginError } from "../../util/revalidate";
import { useNavigate } from "react-router";

export default function LoginAsAdmin() {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var navigate = useNavigate();
  var context = useContext(UserContext);
  const loginAsAdmin = async () => {
    if (username.length <= 0 && password.length <= 0) return;
    const form = new FormData();
    form.set("username", username);
    form.set("password", password);
    console.log(form.entries);
    try {
      await adminLogin(context, form);
      navigate("/admin");
    } catch (e) {
      if (e instanceof LoginError) {
        alert("로그인 실패");
        navigate(0);
      }
    }
  };
  useEffect(() => {
    if (context.loggedIn === true) {
      alert("이미 로그인되어 있습니다");
      navigate("/admin");
    }
  });
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className="p-5 d-flex flex-column justify-content-around"
        style={{
          backgroundColor: "",
          borderRadius: "10px",
          width: "30%",
          height: "50%",
        }}
      >
        <h3>Admin Login</h3>
        <Form.Group>
          <Form.Label style={{ fontSize: "1.3rem", fontWeight: "strong" }}>
            Username
          </Form.Label>
          <Form.Control
            size="lg"
            type="text"
            style={{
              backgroundColor: "#E9F0FE",
              borderColor: "#bdc3c7",
            }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontSize: "1.3rem", fontWeight: "strong" }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            size="lg"
            style={{ backgroundColor: "#E9F0FE", borderColor: "#bdc3c7" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            console.log("clicked");
            loginAsAdmin();
          }}
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
