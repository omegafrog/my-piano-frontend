import CustomAlert from "../alert/CustomAlert";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout({ children }) {
  const topNav = <div className={styles.topNav}></div>;
  // left container
  const leftNav = (
    <div className={styles.leftNav}>
      <div>로그인 세션관리</div>
      <div>유저 관리</div>
      <div>문의사항 관리</div>
      <div>커뮤니티 관리</div>
      <div>악보 관리</div>
      <div>레슨 관리</div>
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
