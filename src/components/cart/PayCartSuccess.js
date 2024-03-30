import { useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";

export function PayCartSuccess() {
  const alertVal = useContext(AlertContext);
  const [params] = useSearchParams();
  const payCnt = params.get("payCnt");
  return (
    <Layout leftNav={false} alertValue={alertVal}>
      <div className="d-flex justify-content-center align-items-center">
        ${payCnt}건의 상품 구매 성공
      </div>
    </Layout>
  );
}
