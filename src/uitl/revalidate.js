import { decodeToken } from "react-jwt";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/User-context";

export default async function revalidate(context, accessToken) {
  const token = decodeToken(accessToken);
  if (Date.now() / 1000 >= token.exp) {
    const response = await axios.get("/api/user/login/invalidate", {
      headers: {
        Authorization: accessToken,
      },
    });
    if (response.data.status === 401) {
      alert("로그인이 만료되었습니다. 다시 로그인하세요.");
      localStorage.removeItem("userState");
      context.initialize();
      return null;
    } else if (response.data.status === 200) {
      context.setAccessToken(response.data.serializedData["access token"]);
      localStorage.setItem("userState", JSON.stringify(context));
      return response.data.serializedData["access token"];
    }
  } else {
    return null;
  }
}
