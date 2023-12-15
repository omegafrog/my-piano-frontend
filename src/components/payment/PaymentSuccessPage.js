import { Container } from "react-bootstrap";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";
import { useParams } from "react-router";

export default function PaymentSuccessPage() {
  const alertValue = useAlert();
  return (
    <Layout alertValue={alertValue} leftNav={false}>
      <Container className="d-flex justify-content-center align-items-center h-100">
        구매에 성공했습니다.
      </Container>
    </Layout>
  );
}
