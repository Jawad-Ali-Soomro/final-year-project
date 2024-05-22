import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import Explore from "./pages/Explore.jsx";
import Series from "./pages/Series.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/art/:id" element={<Main />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/explore/series" element={<Series />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
