import React from "react";
import "../styles/Banner.scss";

const Banner = () => {
  return (
    <div className="banner-wrap flex">
      <div className="content flex col">
        <h1>Discover, Collect, & sell art</h1>
        <p>
          Discover the most outstanding digital arts in all topics of life,
          create you art and sell it here.
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
