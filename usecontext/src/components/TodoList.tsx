import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContextType, TodoType } from "../context/Todo.types";
import { TodoContext } from "../context/TodoContext";
import { Todo } from "./Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { AuthContext } from "../context/Auth";
import { auth, db, logout } from "../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

// import { useAuth } from "../context/Auth";

type Props = {};

export const TodoList = (props: Props) => {
  const { todos, addTodo } = useContext(TodoContext) as TodoContextType;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [display, setDisplay] = useState(0);
  const [displayedTodos, setDisplayedTodos] = useState<TodoType[]>();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // const { user, setUser } = useAuth();
  // const navigate = useNavigate();

  // const logout = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     setUser(null);
  //     navigate("/");
  //   },
  //   [setUser]
  // );
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    switch (display) {
      case 0:
        return setDisplayedTodos(todos);
      case 1:
        return setDisplayedTodos(todos?.filter((todo) => todo.completed));
      case 2:
        return setDisplayedTodos(todos?.filter((todo) => !todo.completed));
    }
  }, [todos, display]);

  if (!auth.currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAdd = () => {
    if (inputRef.current) {
      addTodo(inputRef.current?.value);
      inputRef.current.value = "";
    }
  };
  const notify = () =>
    toast.warn("Type your task first", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const handleAddKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (inputRef.current) {
        addTodo(inputRef.current.value);
        inputRef.current.value = "";
      } else {
        notify();
      }
    }
  };

  return (
    <div className="app-wrapper">
      <div>{name}</div>
      <div>{user?.email}</div>
      <h1 className="my-tasks">MyTasks</h1>

      <input
        placeholder="What do you have planned?"
        className="input"
        ref={inputRef}
        onKeyDown={handleAddKey}
      />
      <button className="button" onClick={handleAdd}>
        Add new task
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="options-wrapper">
        <button
          ref={buttonRef}
          className="all-todos"
          onClick={() => setDisplay(0)}
        >
          All tasks
        </button>
        <button className="checked-todos" onClick={() => setDisplay(1)}>
          Done tasks
        </button>
        <button className="unchecked-todos" onClick={() => setDisplay(2)}>
          Undone tasks
        </button>
      </div>
      <div className="todos-wrapper">
        {todos?.length === 0 ? (
          <div className="empty-list">You didn't add any task yet</div>
        ) : (
          <ul className="list">
            <li>
              {displayedTodos &&
                displayedTodos.map((todo, i) => (
                  <Todo
                    key={`todo-${todo._id}-${i}`}
                    title={todo.title}
                    id={todo._id}
                    completed={todo.completed}
                  />
                ))}
            </li>
          </ul>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
