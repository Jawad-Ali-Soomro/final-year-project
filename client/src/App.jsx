import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import Explore from "./pages/Explore.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/art/:id" element={<Main />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
