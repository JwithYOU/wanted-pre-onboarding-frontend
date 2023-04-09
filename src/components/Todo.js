import { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  // const [jwt, setJwt] = useState("");
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editText, setEditText] = useState("");
  const [editList, setEditList] = useState(true);

  const getTokenLocalStorage = () => {
    return localStorage.getItem("JWT");
  };

  const token = getTokenLocalStorage();

  useEffect(() => {
    if (!token) {
      return (window.location.href = "/signin");
    }
    axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
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

  const handleEditTodo = (index, text) => {
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, text: text } : todo))
    );
    setEditText("");
  };

  const handleChangeList = () => {
    setEditList(!editList);
  };

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Todo list</h1>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center mb-3">Todo List</h3>
          {/* todo list 추가하는 input */}
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
          {/* todo 항목 */}
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  todo.completed ? "bg-success text-white" : ""
                }`}
              >
                {editList ? (
                  <>
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
                      className="btn btn-primary"
                      onClick={() => handleChangeList()}
                      // onClick={() => setEditText(todo.text)}
                    >
                      수정
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <input
                        type="text"
                        className="form-control mt-2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => handleEditTodo(index, editText)}
                    >
                      제출
                    </button>
                  </>
                )}
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(index)}
                  />
                  <label className="form-check-label">{todo.text}</label>
                </div> */}

                {/* 삭제 버튼 시작 */}
                <button
                  type="button"
                  className="btn btn-danger"
                  aria-label="Delete"
                  onClick={() => handleDeleteTodo(index)}
                >
                  삭제
                </button>
                {/* 삭제 버튼 종료 */}

                {/* {editText !== "" && (
                  <div>
                    <input
                      type="text"
                      className="form-control mt-2"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => handleEditTodo(index, editText)}
                    >
                      제출
                    </button>
                  </div>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
