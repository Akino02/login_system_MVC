import { Link, useParams, useNavigate } from "react-router-dom";
import { getCat, deleteCat } from "../../models/Cat";
import { useState, useEffect } from "react";

export default function CatView() {
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
  }

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
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
  }

  if (isLoaded === null) {
    return (
      <>
        <p>Cat not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Cat is loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Cat view</h1>
      <p>{id}</p>
      <p>{cat.name}</p>
      <p>{cat.legs}</p>
      <p>{cat.color}</p>
      <form>
        <input type="text" placeholder={cat.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatecat/${id}`}>
        <p>Update cat</p>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
