import { Navigate, Route, Routes } from "react-router";
import Main from "./router/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./components/User-context";
import Sheets from "./components/sheet/Sheets";
import UploadSheet from "./components/sheet/UploadSheet";
import SheetInfo from "./components/sheet/SheetInfo";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Helmet } from "react-helmet";

function App() {
  return (
    <GoogleOAuthProvider clientId="25240194686-nd0b27v2dcvv9e458hhssip100630t74.apps.googleusercontent.com">
      <Helmet></Helmet>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/main"} />} />
            <Route path="/main" element={<Main />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/sheet" element={<Sheets />} />
            <Route path="/sheet/upload" element={<UploadSheet />} />
            <Route path="/sheet/:id" element={<SheetInfo />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
