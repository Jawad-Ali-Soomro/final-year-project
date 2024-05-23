import React from "react";
import "../styles/Banner.scss";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="banner-wrap flex">
      <div className="content flex col">
        <h1>Discover, Collect, & sell art</h1>
        <p>
          Discover the most outstanding digital arts in all topics of life,
          create your art and sell it here.
        </p>
        <button>EXPLORE</button>
      </div>
      <div className="image-sect flex">
        <img src="../public/hero.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
