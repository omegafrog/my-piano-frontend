import { Container, Row } from "react-bootstrap";

import Layout from "../Layout";
import SheetList from "../sheet/SheetList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../User-context";
import { useNavigate } from "react-router";
import { AlertContext } from "../../context/AlertContext";
import { getPurchasedSheets } from "../AxiosUtil";

export default function PurchasedSheets() {
  const alertValue = useContext(AlertContext);
  const context = useContext(UserContext);
  const [sheetPosts, setSheetPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      try {
        const data = await getPurchasedSheets(context);
        if (data.status === 200) {
          setSheetPosts(data.sheets);
        }
      } catch (e) {
        console.error(e);
        alertValue.alert("danger", e.message);
      }
    }
    invoke();
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
