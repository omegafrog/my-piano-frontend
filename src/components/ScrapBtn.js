import axios from "axios";
import { Button } from "react-bootstrap";
import revalidate from "../util/revalidate";
import { useContext } from "react";
import { UserContext } from "./User-context";

export default function ScrapBtn({ target, id, style, className }) {
  const context = useContext(UserContext);
  return (
    <Button
      className={className}
      style={style}
      variant="outline-secondary"
      id="scrap-btn"
      onClick={(e) => {
        const { accessToken, error } = revalidate(context);
        axios
          .put(`http://localhost:8080/${target}/${id}/scrap`, null, {
            headers: {
              Authorization: accessToken,
            },
            withCredentials: true,
            validateStatus: false,
          })
          .then((response) => {
            if (response.data.status === 200) {
              const scrapBtn = document.querySelector("#scrap-btn");
              scrapBtn.style.backgroundColor = "#74b9ff";
              scrapBtn.innerHTML = "scrapped";
            }
          });
      }}
    >
      <span>🔖scrap</span>
    </Button>
  );
}
