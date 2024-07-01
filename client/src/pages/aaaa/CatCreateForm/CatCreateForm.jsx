import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCat } from "../../models/Cat";

export default function CatCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const cat = await createCat(formData);
    if (cat.status === 201) {
      redirectToSuccessPage(cat.payload._id);
    } else {
      setInfo(cat.msg);
    }
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  }

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdcat/${id}`)
  }

  return (
    <>
      <h1>Cat create form</h1>
      <form>
        <input type="text" name="name" required placeholder="Enter cat name" onChange={e => handleChange(e)}/>
        <input type="number" name="legs" required placeholder="Enter legs" onChange={e => handleChange(e)}/>
        <input type="text" name="color" required placeholder="Enter color" onChange={e => handleChange(e)}/>
        <button onClick={handlePost}>
          Create cat
        </button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
