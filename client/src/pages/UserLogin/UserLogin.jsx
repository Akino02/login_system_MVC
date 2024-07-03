import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInUser } from "../../models/User";

export default function UserLogin() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);

  //kdyz ten token bude existovat tak ho to prevede na stranku s jeho daty
  /*const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token){
      return navigate("/userview")
    }
  }, [])*/



  const postForm = async () => {
    const user = await signInUser(formData);
    console.log(user)
    if (user.status === 201) {
      /*if(remember == true){
        window.localStorage.setItem("token", user.payload)
        window.localStorage.setItem("loggedIn", true)
      }*/
      window.localStorage.setItem("token", user.payload)
      window.localStorage.setItem("isLogged", true)

      redirectToSuccessPage();
    } else {
      setInfo(user.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(remember)
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  /*const handleRemember = (e) => {
    if(e.target.checked == true){
      e.target.value = e.target.checked
      setRemember(e.target.checked)
    }
    else{
      e.target.value = e.target.checked
      setRemember(e.target.checked)
    }
  }*/

  const redirectToSuccessPage = (id) => {
    return navigate(`/userview`);
    //return navigate(`/createduser/${id}`);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyItems: "center", alignItems: "center", flexDirection: "column"}}>
        <h1>Log in</h1>
        <br />
        {info}
        <br />
        <form>
          <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <label>Enter email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <label>Enter password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/*<div style={{display: "flex", flexDirection: "row", marginTop: "10px"}}>
            <label>Remember me</label>
            <input type="checkbox" onChange={handleRemember} />
          </div>*/}

          <div style={{textAlign: "center" ,marginTop: "20px"}}>
            <button onClick={handlePost}>Log in</button>
          </div>
        </form>
        <Link to={"/register"}>
          <p>Sign up</p>
        </Link>
      </div>
    </>
  );
}