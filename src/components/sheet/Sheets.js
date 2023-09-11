import { useContext, useEffect, useState } from "react";
import LeftNavigator from "../LeftNavigator";
import Navigator from "../Navigator";
import axios from "axios";
import { UserContext } from "../User-context";

function Sheets() {
  const { accessToken } = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState([]);

  const getSheetPosts = async () => {
    const result = await axios.get("/api/sheet", { validateStatus: false });
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
        {sheetPosts.length > 0 ? (
          <div className="content">contents</div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
export default Sheets;
