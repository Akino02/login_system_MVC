import "./MainPage.css";
import Content from "../../components/MainPage/Content";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainPage() {

  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/login")
  }, []);
  
  return (
    <>
      <h1>Main page</h1>
      <Link to={"/login"}>
        <p>Log in</p>
      </Link>
      <Link to={"/register"}>
        <p>Sign up</p>
      </Link>
    </>
  );
}
