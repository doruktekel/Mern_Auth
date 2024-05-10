import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7007";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<Welcome />} />
        </Routes>
      </main>
    </>
  );
}
