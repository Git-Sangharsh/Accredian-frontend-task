import React from "react";
import "./App.css";
import Signup from "./component/signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./component/signin/Signin";
import Succesful from "./component/success/Succesful";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/success" element={<Succesful />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
