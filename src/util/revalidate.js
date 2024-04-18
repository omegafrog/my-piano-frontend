import { decodeToken } from "react-jwt";
import axios from "axios";
import { APIError } from "../components/User-context";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`,
  validateStatus: false,
});

export default async function revalidate(context) {
  if (!context) {
    throw new Error("확인되지 않은 오류입니다");
  }
  let before = context.accessToken;
  if (before === "" || context.loggedIn === false) {
    throw new LoginError("로그인이 필요합니다");
  }
  const token = decodeToken(before);
  if (Date.now() / 1000 >= token.exp) {
    const result = await instance.get("/revalidate", {
      headers: {
        Authorization: before,
      },
    });
    if (result.data.status === 200) {
      const newToken = result.data.data["access token"];
      context.setAccessToken(newToken);
      sessionStorage.setItem("userState", JSON.stringify(context));
    } else if (result.data.status === 401) {
      throw new LoginError(result.data.message);
    } else {
      throw new APIError("revalidate fail", result);
    }
  } else {
    console.log("revalidation is not needed.");
    console.log(context.accessToken);
    return before;
  }
}
export class LoginError extends Error {}
