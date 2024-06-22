import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import Explore from "./pages/Explore.jsx";
import Series from "./pages/Series.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.jsx";
import User from "./pages/User.jsx";
import MainSeries from "./pages/mainSeries.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setIsLoading(false)
    } , 4000 )
  })
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={isLoading == true ? <Loader /> : <Home />}
          ></Route>
          <Route path="/art/:id" element={<Main />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/explore/series" element={<Series />}></Route>
          <Route path="/series/:id"  element={<MainSeries />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
