import { useState, useEffect } from "react";

const Todo = () => {
  // const [jwt, setJwt] = useState("");
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const getTokenLocalStorage = () => {
    return localStorage.getItem("JWT");
  };

  const token = getTokenLocalStorage();

  useEffect(() => {
    if (!token) {
      return (window.location.href = "/signin");
    }
  }, [token]);

  const handleAddTodo = () => {
    if (inputText.trim() === "") {
      return;
    }
    setTodos([...todos, { text: inputText, completed: false }]);
    setInputText("");
  };

  const handleToggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Todo list</h1>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center mb-3">Todo List</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add todo"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  todo.completed ? "bg-success text-white" : ""
                }`}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(index)}
                  />
                  <label className="form-check-label">{todo.text}</label>
                </div>
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
