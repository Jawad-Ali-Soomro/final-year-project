import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import Explore from "./pages/Explore.jsx";
import Series from "./pages/Series.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster />
      <BrowserRouter>
    <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/art/:id" element={<Main />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/explore/series" element={<Series />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
