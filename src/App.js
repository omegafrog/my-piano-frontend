import { Navigate, Route, Routes } from "react-router";
import Main from "./router/Main";
import Login from "./components/Login";
import Register from "./components/user/Register";
import { UserProvider } from "./components/User-context";
import Sheets from "./components/sheet/Sheets";
import UploadSheet from "./components/sheet/UploadSheet";
import SheetInfo from "./components/sheet/SheetInfo";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./css/App.css";
import RegisterSuccessPage from "./components/user/RegisterSuccessPage";
import ScrappedSheetList from "./components/user/ScrappedSheetList";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";
import Lessons from "./components/lesson/Lessons";
import UploadLesson from "./components/lesson/UploadLesson";
import LessonInfo from "./components/lesson/LessonInfo";
import PurchasedSheets from "./components/user/PurchasedSheets";
import CartInfo from "./components/cart/CartInfo";

function App() {
  return (
    <GoogleOAuthProvider clientId="25240194686-nd0b27v2dcvv9e458hhssip100630t74.apps.googleusercontent.com">
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
            <Route path="/sheet/purchased" element={<PurchasedSheets />} />
            <Route path="/lesson" element={<Lessons />} />
            <Route path="/lesson/upload" element={<UploadLesson />} />
            <Route path="/lesson/:id" element={<LessonInfo />} />
            <Route path="/cart" element={<CartInfo />} />
            <Route
              path="/user/register/success"
              element={<RegisterSuccessPage />}
            />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/sheet/scrapped" element={<ScrappedSheetList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
