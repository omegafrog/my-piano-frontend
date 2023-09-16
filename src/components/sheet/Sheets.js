import { useContext, useEffect, useState } from "react";
import LeftNavigator from "../LeftNavigator";
import Navigator from "../Navigator";
import axios from "axios";
import { UserContext } from "../User-context";
import { Link } from "react-router-dom";

function Sheets() {
  const { accessToken } = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState([]);

  const getSheetPosts = async () => {
    const result = await axios.get("/api/sheet", { validateStatus: false });
    setSheetPosts(result.data.serializedData.sheetPosts);
  };

  useEffect(() => {
    getSheetPosts();
  }, []);

  return (
    <div className="Sheets">
      <Navigator />
      <div>
        <LeftNavigator />
        {sheetPosts.length > 0 ? (
          <div className="content">
            <ul>
              {sheetPosts.map((item) => (
                <li key={item.id}>
                  <Link to={`${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
export default Sheets;
