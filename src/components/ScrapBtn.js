import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/User-context";
import { isScrapped, scrap, unscrap } from "./AxiosUtil";
import { AlertContext } from "../context/AlertContext";

export default function ScrapBtn({ target, id, style, className }) {
  const context = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  useEffect(() => {
    async function invoke() {
      if (context.loggedIn === true) {
        if (
          context.loggedUser.role === "USER" ||
          context.loggedUser.role === "CREATOR"
        ) {
          try {
            const data = await isScrapped(context, target, id);
            if (data.isScrapped === true) {
              const scrapBtn = document.querySelector("#scrap-btn");
              scrapBtn.style.backgroundColor = "#74b9ff";
              scrapBtn.innerHTML = "🔖scrapped";
              scrapBtn.classList.add("active");
            }
          } catch (e) {
            alertContext.alert("danger", e.message);
          }
        }
      }
    }
    invoke();
  }, []);
  return (
    <Button
      className={className}
      style={style}
      variant="outline-secondary"
      id="scrap-btn"
      disabled={
        context.loggedUser.role === "ADMIN" ||
        context.loggedUser.role === "SU_ADMIN"
      }
      onClick={async () => {
        const scrapBtn = document.querySelector("#scrap-btn");
        if (scrapBtn.classList.contains("active") === true) {
          try {
            await unscrap(context, target, id);
            scrapBtn.style.backgroundColor = "white";
            scrapBtn.innerHTML = "🔖scrap";
            scrapBtn.classList.toggle("active");
          } catch (e) {
            console.error(e);
            alertContext.alert("danger", e.message);
          }
        } else {
          try {
            await scrap(context, target, id);
            scrapBtn.style.backgroundColor = "#74b9ff";
            scrapBtn.innerHTML = "scrapped";
            scrapBtn.classList.toggle("active");
          } catch (e) {
            console.error(e);
            alertContext.alert("danger", e.message);
          }
        }
      }}
    >
      <span>🔖scrap</span>
    </Button>
  );
}
