import axios from "axios";
import { Button } from "react-bootstrap";
import revalidate from "../util/revalidate";
import { useContext, useEffect } from "react";
import { UserContext } from "./User-context";

export default function ScrapBtn({ target, id, style, className }) {
  const context = useContext(UserContext);

  useEffect(() => {
    if (context.loggedIn === true) {
      const response = revalidate(context) || {};
      const { accessToken, error } = response;
      axios
        .get(`http://localhost:8080/${target}/${id}/scrap`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          if (response.data.data.isScrapped === true) {
            const scrapBtn = document.querySelector("#scrap-btn");
            scrapBtn.style.backgroundColor = "#74b9ff";
            scrapBtn.innerHTML = "scrapped";
            scrapBtn.classList.add("active");
          }
        })
        .catch((error) => {});
    }
  });
  return (
    <Button
      className={className}
      style={style}
      variant="outline-secondary"
      id="scrap-btn"
      onClick={(e) => {
        const { accessToken, error } = revalidate(context);
        const scrapBtn = document.querySelector("#scrap-btn");
        const option = {
          headers: {
            Authorization: accessToken,
          },
          withCredentials: true,
          validateStatus: false,
        };
        if (scrapBtn.classList.contains("active") === true) {
          axios
            .delete(`http://localhost:8080/${target}/${id}/scrap`, option)
            .then((response) => {
              if (response.data.status === 200) {
                scrapBtn.style.backgroundColor = "white";
                scrapBtn.innerHTML = "🔖scrap";
                scrapBtn.classList.toggle("active");
              }
            });
        } else {
          axios
            .put(`http://localhost:8080/${target}/${id}/scrap`, null, option)
            .then((response) => {
              if (response.data.status === 200) {
                scrapBtn.style.backgroundColor = "#74b9ff";
                scrapBtn.innerHTML = "scrapped";
              }
            });
        }
      }}
    >
      <span>🔖scrap</span>
    </Button>
  );
}
