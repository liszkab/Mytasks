import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  logout,
  auth,
} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log("Name: " + profile.getName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  return (
    <div>
      <h1 className="my-tasks">MyTasks</h1>
      <h2 className="welcome">Welcome To MyTasks!</h2>
      <div className="introduction">
        Sign up to manage your tasks in the easiest way!
      </div>
      <input
        type="text"
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="login-button"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        Login
      </button>
      <button className="login-button" onClick={() => signInWithGoogle()}>
        Log In with Google
      </button>
      <button className="login-button" onClick={() => logout()}>
        Log out
      </button>
      <button onClick={() => console.log(auth.currentUser)}>Check</button>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <meta name="google-signin-client_id" content="formal-scout-368115"></meta>
      {/* <button className="g-signin2" onClick={onSignIn}></button> */}
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
      {/* <button className="register-button" onClick={() => handleRegister()}>
        Register
      </button> */}
    </div>
  );
};

export default Home;
