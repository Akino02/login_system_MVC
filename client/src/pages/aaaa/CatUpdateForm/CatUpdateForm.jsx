import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCat, getCat } from "../../models/Cat";

export default function CatUpdateForm() {
  const { id } = useParams();
  const [cat, setCat] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getCat(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCat(data.payload);
      setLoaded(true);
    }
  };

  const postForm = async () => {
    const cat = await updateCat(id, formData);
    if (cat.status === 200) {
      navigate(`/cat/${id}`);
    } else {
      setInfo(cat.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Cat not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Cat is loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Cat update form</h1>
      <p>{id}</p>
      <form>
        <input
          type="text"
          defaultValue={cat.name}
          name="name"
          required
          placeholder="Enter cat name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          defaultValue={cat.legs}
          name="legs"
          required
          placeholder="Enter legs"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          defaultValue={cat.color}
          name="color"
          required
          placeholder="Enter color"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update cat</button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
