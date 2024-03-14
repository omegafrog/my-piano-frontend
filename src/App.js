import { Navigate, Route, Routes } from "react-router";
import Main from "./components/main/Main";
import Login from "./components/Login";
import Register from "./components/user/Register";
import { UserContext, UserProvider } from "./components/User-context";
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
import CheckoutPage from "./components/payment/CheckoutPage";
import PaymentSuccessPage from "./components/payment/PaymentSuccessPage";
import ConfirmPayment from "./components/payment/ConfirmPayment";
import { PayCartSuccess } from "./components/cart/PayCartSuccess";
import React from "react";
import ChangeUserDetailPage from "./components/user/ChangeUserDetailPage";
import AuthRouter from "./AuthRouter";
import { AlertProvider } from "./context/AlertContext";
import CashPaymentListPage from "./components/user/CashPaymentList";
import { Posts } from "./components/post/Posts";
import WritePost from "./components/post/WritePost";
import PostInfo from "./components/post/PostInfo";

function App() {
  return (
    <GoogleOAuthProvider clientId="25240194686-nd0b27v2dcvv9e458hhssip100630t74.apps.googleusercontent.com">
      <UserProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to={"/main"} />} />
              <Route path="/main" element={<Main />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/sheet" element={<Sheets />} />
              <Route
                path="/sheet/upload"
                element={
                  <AuthRouter>
                    <UploadSheet />
                  </AuthRouter>
                }
              />
              <Route path="/sheet/:id" element={<SheetInfo />} />
              <Route path="/sheet/purchased" element={<PurchasedSheets />} />
              <Route path="/lesson" element={<Lessons />} />
              <Route path="/lesson/upload" element={<UploadLesson />} />
              <Route path="/lesson/:id" element={<LessonInfo />} />
              <Route path="/post" element={<Posts />} />
              <Route path="/post/:id" element={<PostInfo />} />
              <Route path="/post/write" element={<WritePost />} />

              <Route path="/cart" element={<CartInfo />} />
              <Route path="/cart/success" element={<PayCartSuccess />} />
              <Route
                path="/user/register/success"
                element={<RegisterSuccessPage />}
              />
              <Route
                path="/user"
                element={
                  <AuthRouter>
                    <ChangeUserDetailPage />
                  </AuthRouter>
                }
              ></Route>
              <Route
                path="/user/purchased"
                element={
                  <AuthRouter>
                    <ChangeUserDetailPage />
                  </AuthRouter>
                }
              />
              <Route
                path="/user/cash"
                element={
                  <AuthRouter>
                    <CashPaymentListPage />
                  </AuthRouter>
                }
              />
              <Route path="/cash/success" element={<PaymentSuccessPage />} />
              <Route path="/cash/confirm" element={<ConfirmPayment />} />
              <Route path="/cash/checkout" element={<CheckoutPage />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/sheet/scrapped" element={<ScrappedSheetList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AlertProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
