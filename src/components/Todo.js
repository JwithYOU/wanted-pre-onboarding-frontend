import { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  // const [jwt, setJwt] = useState("");
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(null);

  const getTokenLocalStorage = () => {
    return localStorage.getItem("JWT");
  };

  const token = getTokenLocalStorage();

  const apiUrl = "https://www.pre-onboarding-selection-task.shop/";

  useEffect(() => {
    if (!token) {
      return (window.location.href = "/signin");
    }
    axios
      .get(`${apiUrl}todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // add 버튼 함수
  const handleAddTodo = () => {
    if (inputText.trim() === "") {
      return;
    }
    axios
      .post(
        `${apiUrl}todos`,
        { todo: inputText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
    setInputText("");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // 수정 버튼 함수
  const handleEdit = (id, todo) => {
    setEditing(id);
    setEditText(todo);
  };

  // 삭제 버튼 함수
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    axios
      .delete(`${apiUrl}todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 제출 버튼 함수
  const handleEditTodo = (text, id, completed) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: text } : todo))
    );
    setEditText(editText);
    setEditing(null);
    axios
      .put(
        `${apiUrl}todos/${id}`,
        { todo: editText, isCompleted: completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 취소 버튼 함수
  const cancelEdit = () => {
    setEditing(null);
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
              data-testid="new-todo-input"
              placeholder="Add todo"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="btn btn-primary"
              data-testid="new-todo-add-button"
              type="button"
              onClick={handleAddTodo}
            >
              추가
            </button>
          </div>
          {/* todo 항목 */}
          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`list-group-item ${
                  todo.isCompleted ? "bg-success text-white" : ""
                }`}
              >
                {editing !== todo.id ? (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleToggleTodo(todo.id)}
                      />
                      <label className="form-check-label">{todo.todo}</label>
                    </div>
                    {/* 수정 버튼 시작 */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-testid="modify-button"
                      onClick={() => handleEdit(todo.id, todo.todo)}
                      // onClick={() => setEditText(todo.text)}
                    >
                      수정
                    </button>
                    {/* 수정 버튼 종료 */}
                    {/* 삭제 버튼 시작 */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-testid="delete-button"
                      aria-label="Delete"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      삭제
                    </button>
                    {/* 삭제 버튼 종료 */}
                  </>
                ) : (
                  <>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => handleToggleTodo(todo.id)}
                      />
                      <input
                        type="text"
                        className="form-control mt-2"
                        data-testid="modify-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </div>
                    {/* 제출 버튼 시작 */}
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      data-testid="submit-button"
                      onClick={() =>
                        handleEditTodo(editText, todo.id, todo.isCompleted)
                      }
                    >
                      제출
                    </button>
                    {/* 제출 버튼 종료 */}
                    {/* 취소 버튼 시작 */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-testid="cancel-button"
                      aria-label="Delete"
                      onClick={() => cancelEdit()}
                    >
                      취소
                    </button>
                    {/* 취소 버튼 종료 */}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
