import { Route, Routes } from "react-router";
import Main from "./router/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./components/User-context";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
