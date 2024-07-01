import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import UserRegister from "./UserRegister/UserRegister";
import UserLogin from "./UserLogin/UserLogin";
import UserView from "./UserView/UserView";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<UserRegister/>}></Route>
          <Route path="/login" element={<UserLogin/>}></Route>
          <Route path="/userview" element={<UserView/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
