import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:7007";
axios.defaults.withCredentials = true;

export default function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}
        </Routes>
      </main>
    </>
  );
}
