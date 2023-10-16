import { useContext, useEffect, useMemo, useState } from "react";
import LeftNavigator from "../LeftNavigator";
import Navigator from "../Navigator";
import axios from "axios";
import { UserContext } from "../User-context";
import { Link } from "react-router-dom";
import { GetSheetPosts } from "../AxiosUtil";
import CustomAlert from "../CustomAlert";

function SheetList({ sheetPosts }) {
  if (sheetPosts.length > 0) {
    return (
      <div className="w-100">
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
  const [showAlert, setShowAlert] = useState({ state: false, text: "" });
  const value = useMemo(
    () => ({ showAlert, setShowAlert }),
    [showAlert, setShowAlert]
  );

  useEffect(() => {
    GetSheetPosts(setSheetPosts, setShowAlert);
  }, []);

  return (
    <div className="Sheets">
      <Navigator />
      <CustomAlert variant={"danger"} value={value} />
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
