import { decodeToken } from "react-jwt";
import axios from "axios";

export default function revalidate(context) {
  console.log("context:", context);
  if (context.accessToken === "") {
    return { accessToken: null, error: "Login needed" };
  }
  const token = decodeToken(context.accessToken);
  if (Date.now() / 1000 >= token.exp) {
    axios
      .get("http://localhost:8080/revalidate", {
        headers: {
          Authorization: context.accessToken,
        },
        validateStatus: false,
      })
      .then((response) => {
        console.log("a");
        if (response.data.status === 200) {
          const newToken = response.data.data["access token"];
          context.setAccessToken(newToken);
          sessionStorage.setItem("userState", JSON.stringify(context));
        } else {
          return {
            accessToken: null,
            error: {
              status: response.data.status,
              message: response.data.message,
            },
          };
        }
      })
      .catch((error) => {
        console.log("error:", error);
        return {
          accessToken: null,
          error: {
            message: "network error",
          },
        };
      });
  } else {
    console.log("revalidation is not needed.");
    console.log(context.accessToken);
    return { accessToken: context.accessToken, error: null };
  }
}
