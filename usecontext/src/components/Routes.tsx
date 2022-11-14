import React, { ReactElement, ReactNode, useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import Home from "../pages/Home";
import { TodoList } from "./TodoList";
import Register from "../pages/Register";
import { auth } from "../firebase/firebase";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

type Props = {
  user: any | undefined;
  children: ReactNode;
};

const PrivateRoutes = ({ user, children }: Props): any => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const MyRoutes = () => {
  const user = auth.currentUser;
  return (
    <Router>
      <Route index path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoutes user={user}>
            <TodoList />
          </PrivateRoutes>
        }
      />
      <Route path="register" element={<Register />} />
    </Router>
  );
};
export default MyRoutes;
