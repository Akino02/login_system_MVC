import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserData } from "../../models/User";
import { useState, useEffect } from "react";

export default function UserView() {
  const { token } = useState(window.localStorage.getItem("token"))
  const [user, setUser] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getUserData(token);
    console.log(data)
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setUser(data.payload);
      setInfo(data.msg)
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    navigate("/login");
  }

  /*const handleChange = (e) => {
    setFormData(e.target.value);
  }*/

  /*const handleDelete = async (e) => {
    e.preventDefault();
    if (cat.name === formData) {
      const data = await deleteCat(id);
      if (data.status === 200) {
        navigate("/");
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
    }
  }*/

  if (isLoaded === null) {
    return (
      <>
        {info}
        <p>User not found</p>
        <button onClick={logOut} >Log out</button>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        {info}
        <p>User is loading...</p>
        <button onClick={logOut} >Log out</button>
      </>
    )
  }

  return (
    <>
      {info}
      <h1>User view</h1>
      <p>{user._id}</p>
      <p>{user.fname}</p>
      <p>{user.lname}</p>
      <p>{user.email}</p>
      {/*<form>
        <input type="text" placeholder={cat.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatecat/${id}`}>
        <p>Update cat</p>
      </Link>*/}
      <button onClick={logOut} >Log out</button>
      {/*<Link to={"/"}>
        <p>Go back</p>
      </Link>*/}
    </>
  );
}
