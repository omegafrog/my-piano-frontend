import { useContext, useEffect } from "react";
import { UserContext } from "./components/User-context";
import { useNavigate } from "react-router";
function AuthRouter({ children }) {
  const context = useContext(UserContext);
  const isLoggedIn = context.loggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      window.location.href = "/main";
    } else {
      if (window.location.pathname.includes("admin")) {
        if (context.loggedUser.role !== "ADMIN") {
          alert("잘못된 접근입니다.");
          navigate("/main");
        }
      }
    }
  }, []);

  return <>{children}</>;
}
export default AuthRouter;
