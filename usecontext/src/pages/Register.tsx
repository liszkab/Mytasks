import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../context/Auth";
import { TodoList } from "../components/TodoList";
import { TodoContextType, TodoType, UserType } from "../context/Todo.types";
import { TodoContext } from "../context/TodoContext";
import e from "express";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterProps {}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // const [user, setUser] = useState<TodoType[]>([]);
  const navigate = useNavigate();
  // const inputUserRef = useRef<HTMLInputElement | null>(null);
  // const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  // const [users, setUsers] = useState<UserType[]>([]);
  const handleRegister = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  const notify = () =>
    toast.error("Username is alreasy used", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const success = () =>
    toast.success("Congratuations! Now You can sign up", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);
  // }

  return (
    <div>
      <h1 className="my-tasks">MyTasks</h1>
      <h2 className="welcome">Welcome To MyTasks!</h2>
      <div className="introduction">Create Your account for free</div>
      <div>
        <input
          type="text"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <div className="introduction">Your name</div>
        <input
          type="text"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <div className="introduction">E-mail</div>
        <input
          type="password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="introduction">Password</div>
        <button className="login-button" onClick={() => handleRegister()}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Register;
