import { Container } from "react-bootstrap";

import Layout from "../Layout";
import { AlertContext } from "../../context/AlertContext";
import { useContext } from "react";

export default function PaymentSuccessPage() {
  const alertValue = useContext(AlertContext);
  return (
    <Layout alertValue={alertValue} leftNav={false}>
      <Container className="d-flex justify-content-center align-items-center h-100">
        구매에 성공했습니다.
      </Container>
    </Layout>
  );
}
