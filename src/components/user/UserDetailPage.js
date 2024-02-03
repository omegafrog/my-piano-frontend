import { forwardRef, useRef } from "react";
import useAlert from "../../hook/useAlert";
import Layout from "../Layout";
import LeftUserNavigator from "../navigator/LeftUserNavigator";
import ChangeUserInfo from "../navigator/ChangeUserInput";

export default function UserDetailPage() {
  const alertValue = useAlert();

  const userDetailPage = useRef();
  return (
    <Layout
      alertValue={alertValue}
      leftNav={<LeftUserNavigator pageRef={userDetailPage} />}
    >
      <div className="w-100" ref={userDetailPage}>
        <ChangeUserInfo />
      </div>
    </Layout>
  );
}
