import { useSearchParams } from "react-router-dom";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";

export function PayCartSuccess() {
  const alertVal = useAlert();
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
