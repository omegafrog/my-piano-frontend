import { useContext, useEffect, useState } from "react";
import LeftNavigator from "../LeftNavigator";
import Navigator from "../Navigator";
import axios from "axios";
import { UserContext } from "../User-context";

function Sheets() {
  const { accessToken } = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState([]);

  const getSheetPosts = async () => {
    const result = await axios.get("/api/sheet", {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(result);
  };

  useEffect(() => {
    getSheetPosts();
  });

  return (
    <div className="Sheets">
      <Navigator />
      <div>
        <LeftNavigator />
        <div className="content">contents</div>
      </div>
    </div>
  );
}
export default Sheets;
