/*export const getUsers = async () => {
  const req = await fetch("http://localhost:3000/user", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};
export const getUser = async (id) => {
  const req = await fetch(`http://localhost:3000/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};*/
export const createUser = async (formData) => {
  const req = await fetch(`http://localhost:3000/user/register`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};

export const signInUser = async (formData) => {
  const req = await fetch(`http://localhost:3000/user/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};

export const getUserData = async (formData) => {
  const req = await fetch(`http://localhost:3000/user/userdata`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({"token": window.localStorage.getItem("token")}),
  });
  const data = await req.json();
  //pokud tedy token vyprsel tak se stranka restartuje a da na login page
  if(data.payload == "token expired"){
    alert("Token expired please log in again")
    window.localStorage.clear();
    window.location.href = "/login"
  }
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};

/*export const updateUser = async (id, formData) => {
  const req = await fetch(`http://localhost:3000/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};
export const deleteUser = async (id) => {
  const req = await fetch(`http://localhost:3000/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    msg: data.msg,
  };
};*/
