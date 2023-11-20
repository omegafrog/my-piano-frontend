import { Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { useContext } from "react";
import useAlert from "../hook/useAlert";
import { UserContext } from "../components/User-context";
import revalidate from "../util/revalidate";

function Main() {
  const alertValue = useAlert();
  const context = useContext(UserContext);
  return (
    <Layout alertValue={alertValue}>
      <Button
        onClick={() => {
          const { accessToken, error } = revalidate(context);
          console.log("accessToken:", accessToken);
          console.log("error:", error);
        }}
      >
        revalidate test
      </Button>
    </Layout>
  );
}
export default Main;
