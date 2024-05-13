import { Navigate, Route, Routes } from "react-router";
import Main from "./components/main/Main";
import Login from "./components/Login";
import Register from "./components/user/Register";
import { UserProvider } from "./context/User-context";
import Sheets from "./components/sheet/Sheets";
import UploadSheet from "./components/sheet/UploadSheet";
import SheetInfo from "./components/sheet/SheetInfo";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./css/App.scss";
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
import React, { useContext } from "react";
import ChangeUserDetailPage from "./components/user/ChangeUserDetailPage";
import AuthRouter from "./AuthRouter";

import { AlertProvider } from "./context/AlertContext";
import { Posts } from "./components/post/Posts";
import PostInfo from "./components/post/PostInfo";
import WritePost from "./components/post/WritePost";
import CashPaymentListPage from "./components/user/CashPaymentList";
import EditPost from "./components/post/EditPost";
import DashBoard from "./components/admin/DashBoard";
import LoginAsAdmin from "./components/admin/LoginAsAdmin";
import { Sessions } from "./components/admin/Sessions";
import Users from "./components/admin/Users";
import Tickets from "./components/admin/Tickets";
import AdminLessons from "./components/admin/Lessons";
import AdminSheets from "./components/admin/Sheets";
import AdminPosts from "./components/admin/Posts";
import AdminTicket from "./components/admin/AdminTicketInfo";
import UpdateSheetPost from "./components/sheet/UpdateSheetPost";
import { NotiContext, NotiProvider } from "./context/NotiContext";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <NotiProvider>
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
                <Route path="/sheet/:id/edit" element={<UpdateSheetPost />} />
                <Route path="/sheet/purchased" element={<PurchasedSheets />} />
                <Route path="/lesson" element={<Lessons />} />
                <Route path="/lesson/upload" element={<UploadLesson />} />
                <Route path="/lesson/:id" element={<LessonInfo />} />
                <Route path="/post" element={<Posts />} />
                <Route path="/post/:id" element={<PostInfo />} />
                <Route path="/post/:id/edit" element={<EditPost />} />
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

                <Route path="/admin/login" element={<LoginAsAdmin />} />
                <Route path="/admin" element={<DashBoard />} />
                <Route path="/admin/sessions" element={<Sessions />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/tickets" element={<Tickets />} />
                <Route path="/admin/posts" element={<AdminPosts />} />
                <Route path="/admin/sheets" element={<AdminSheets />} />
                <Route path="/admin/lessons" element={<AdminLessons />} />
                <Route path="/admin/tickets/:id" element={<AdminTicket />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AlertProvider>
        </NotiProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
