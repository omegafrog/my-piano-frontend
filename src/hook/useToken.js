import { useContext } from "react";
import { UserContext } from "../components/User-context";

export default function useToken() {
  const context = useContext(UserContext);
  return context.accessToken;
}
