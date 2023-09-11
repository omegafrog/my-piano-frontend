import { Route, Routes } from "react-router";
import Main from "./router/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./components/User-context";
import Sheets from "./components/sheet/Sheets";
import UploadSheet from "./components/sheet/UploadSheet";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/sheet" element={<Sheets />} />
        <Route path="/sheet/upload" element={<UploadSheet />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
