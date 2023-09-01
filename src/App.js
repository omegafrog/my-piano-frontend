import { Route, Routes } from "react-router";
import Main from "./router/Main";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
    </Routes>
  );
}

export default App;
