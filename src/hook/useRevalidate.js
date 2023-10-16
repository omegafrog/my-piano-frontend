import { useContext, useState } from "react";
import { UserContext } from "../components/User-context";
import { decodeToken } from "react-jwt";
import axios from "axios";

export default async function useRevalidate(context) {
  const jwtSecret = process.env.REACT_APP_JWT_SECRET;
  const token = decodeToken(context.accessToken);
  if (Date.now() / 1000 >= token.exp) {
    console.log("revalidation is needed.");
    console.log("before", context.accessToken);
    try {
      const response = await axios.get("/api/user/login/revalidate", {
        headers: {
          Authorization: context.accessToken,
        },
        validateStatus: false,
      });
      if (response.data.status === 200) {
        const newToken = response.data.serializedData["access token"];
        context.setAccessToken(newToken);
        localStorage.setItem("userState", JSON.stringify(context));
        return { accessToken: newToken };
      } else {
        return {
          error: {
            status: response.data.status,
            message: response.data.message,
          },
        };
      }
    } catch (error) {
      if (error.response) return { error: { status: error.response.status } };
    }
  } else {
    console.log("revalidation is not needed.");
    console.log(context.accessToken);
    return { accessToken: context.accessToken };
  }
}
