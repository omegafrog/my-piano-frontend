import { useContext } from "react";
import Layout from "../Layout";
import LeftUserNavigator from "../navigator/LeftUserNavigator";
import { AlertContext } from "../../context/AlertContext";
import { UserContext } from "../../context/User-context";
import ChangeUserInfo from "../navigator/ChangeUserInput";

export default function ChangeUserDetailPage() {
  const alertValue = useContext(AlertContext);
  const context = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  return (
    <Layout alertValue={alertValue} leftNav={<LeftUserNavigator />}>
      <ChangeUserInfo alertValue={alertContext} context={context} />
    </Layout>
  );
}
