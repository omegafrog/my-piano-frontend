import { useContext, useEffect, useState } from "react";
import LeftNavigator from "../LeftNavigator";
import Navigator from "../Navigator";
import axios from "axios";
import { UserContext } from "../User-context";
import { Link } from "react-router-dom";

function SheetList({ sheetPosts }) {
  if (sheetPosts.length > 0) {
    return (
      <div className="content m-4">
        <ul>
          {sheetPosts.map((item) => (
            <li key={item.id}>
              <a href={`/sheet/${item.id}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <h1>아직 올린 악보가 없습니다.</h1>;
  }
}

function Sheets() {
  const { accessToken } = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState();

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
      <div className="vh-100 d-flex">
        <LeftNavigator />
        {sheetPosts === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <SheetList sheetPosts={sheetPosts} />
        )}
      </div>
    </div>
  );
}
export default Sheets;
