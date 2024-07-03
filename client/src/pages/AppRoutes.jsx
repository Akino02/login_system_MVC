import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import UserRegister from "./UserRegister/UserRegister";
import UserLogin from "./UserLogin/UserLogin";
import UserView from "./UserView/UserView";

export default function AppRoutes() {
  
  const isLogged = window.localStorage.getItem("isLogged")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ isLogged == "true" ? <UserView/> : <UserLogin/>} />
          <Route path="/register" element={<UserRegister/>}></Route>
          <Route path="/login" element={<UserLogin/>}></Route>
          <Route path="/userview" element={<UserView/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
