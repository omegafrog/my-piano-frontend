import { useContext, useEffect } from "react";
import { UserContext } from "./components/User-context";
import { useNavigate } from "react-router";
function AuthRouter({ children }) {
  const context = useContext(UserContext);
  const isLoggedIn = context.loggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/main");
      alert("로그인이 필요합니다.");
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
}
export default AuthRouter;
