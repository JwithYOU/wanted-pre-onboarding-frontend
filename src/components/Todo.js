import { useState, useEffect } from "react";

const Todo = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    setJwt(localStorage.getItem("JWT"));
    if (!jwt) {
      return (window.location.href = "/signin");
    }
  }, [jwt]);
  return <h1>Welcome to Todo list</h1>;
};

export default Todo;
