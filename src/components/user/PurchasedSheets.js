import { Container, Row } from "react-bootstrap";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";
import SheetList from "../sheet/SheetList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../User-context";
import { useNavigate } from "react-router";

export default function PurchasedSheets() {
  const alertValue = useAlert();
  const context = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (context.loggedIn === false) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/main";
    }
    axios
      .get("http://localhost:8080/user/purchasedSheets", {
        headers: {
          Authorization: context.accessToken,
        },
        validateStatus: false,
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setSheetPosts(response.data.data.sheets);
        }
      });
  }, [context]);
  return (
    <Layout leftNav={true} alertValue={alertValue}>
      <Container className="my-4">
        <h3>구매 악보</h3>
        <Row className="m-4 d-flex justify-content-center">
          {sheetPosts ? (
            <SheetList
              sheetPosts={sheetPosts}
              navigate={navigate}
              noContentMessage={"아직 구매한 악보가 없습니다."}
            />
          ) : (
            <h3>Loading...</h3>
          )}
        </Row>
      </Container>
    </Layout>
  );
}
