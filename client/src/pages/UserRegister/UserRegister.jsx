import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUser } from "../../models/User";

export default function UserRegister() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const user = await createUser(formData);
    if (user.status === 201) {
      redirectToSuccessPage(user.payload._id);
    } else {
      setInfo(user.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/login`);
    //return navigate(`/createduser/${id}`);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyItems: "center", alignItems: "center", flexDirection: "column"}}>
        <h1>Sign up</h1>
        <br />
        {info}
        <br />
        <form>
          <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <label>First name</label>
            <input
              type="text"
              name="fname"
              required
              placeholder="Enter First name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <label>Last name</label>
            <input
              type="text"
              name="lname"
              required
              placeholder="Enter Last name"
              onChange={(e) => handleChange(e)}
            />
          </div>
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

          <div style={{textAlign: "center" ,marginTop: "20px"}}>
            <button onClick={handlePost}>Sign up</button>
          </div>
        </form>
        <Link to={"/login"}>
          <p>Log in</p>
        </Link>
      </div>
    </>
  );
}
