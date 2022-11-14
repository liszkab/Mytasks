import React, { useState } from "react";

import "./App.css";

import Layout from "./components/Layout";
import MyRoutes from "./components/Routes";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const toggleRoute = () => {
  //   setLoggedIn(!loggedIn);
  //   console.log(loggedIn);
  // };
  return (
    <div className="App">
      <Router>
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
