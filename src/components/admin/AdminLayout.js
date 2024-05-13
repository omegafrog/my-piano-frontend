import { useContext } from "react";
import CustomAlert from "../alert/CustomAlert";
import styles from "./AdminLayout.module.scss";
import { UserContext } from "../../context/User-context";
import { Col, Image, Row } from "react-bootstrap";
import { adminLogout } from "../AxiosUtil";
import { useNavigate } from "react-router";

export default function AdminLayout({ children }) {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const topNav = (
    <div className={styles.topNav}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col
          xs={"auto"}
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        >
          <Image src="/img/logo-ko.png" className={styles.logo}></Image>
        </Col>
        <Col></Col>
        <Col xs={4} className={styles.infoNavCol}>
          <div>
            <span style={{ fontSize: "1.2rem" }}>
              {context.loggedUser.name}
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="mx-3"
            onClick={async () => {
              await adminLogout(context);
              alert("로그아웃 되었습니다.");
              navigate("/admin/login");
            }}
          >
            <span>로그아웃</span>
          </div>
        </Col>
      </Row>
    </div>
  );

  // left container
  const leftNav = (
    <div className={styles.leftNav}>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/sessions")}
      >
        로그인 세션관리
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/users")}
      >
        유저 관리
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/tickets")}
      >
        문의사항 관리
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/posts")}
      >
        커뮤니티 관리
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/sheets")}
      >
        악보 관리
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/admin/lessons")}
      >
        레슨 관리
      </div>
    </div>
  );
  return (
    <div className="w-100 h-100">
      {topNav}
      <CustomAlert />
      <div className={styles.wrapper}>
        {leftNav}
        <div className={styles.child}>{children}</div>
      </div>
    </div>
  );
}
