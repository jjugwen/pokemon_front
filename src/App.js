//App.js

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../src/pages/Main";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Detail from "../src/pages/Detail";

import { loadPostDB } from "../src/redux/modules/pokelist";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostDB());
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" exact element={<Detail />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
