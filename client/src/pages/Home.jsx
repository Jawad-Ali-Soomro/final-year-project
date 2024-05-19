import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/Home.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant.js";
import Featured from "../components/Featured.jsx";
import SeriesFeatured from "../components/FeatredSeries.jsx";

const Home = () => {
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    await axios.get(`${baseArtUrl}/get/featured/images`).then((res) => {
      set_data(res.data.data[0]);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div>
      <Header />
      <Banner />
      <div className="trending flex col">
        <h1>TRENDING</h1>
        <p>
        Art is the mirror where society sees its reflection, and in its trends,
        we find the whispers of tomorrow's culture
        </p>
        <div className="card flex">
          <div className="left-content flex col">
            <h1>{main_data?.title}</h1>
            <div className="tags">
              {main_data?.tags?.map((tag) => {
                return (
                  <div className="tag flex">
                    <p>{tag}</p>
                  </div>
                );
              })}
            </div>
            <div className="profile-series flex">
              <div className="profile inherit flex">
                <img src={main_data?.owner?.avatar} alt="" />
                <div className="info flex col">
                  <p>ARTIST</p>
                  <h2>{main_data?.owner?.username}</h2>
                </div>
              </div>
              {main_data?.series?.map((series) => {
                return (
                  <div className="series inherit flex">
                    <img src={series?.image} alt="" />
                    <div className="info flex col">
                      <p>SERIES</p>
                      <h2>{series?.title}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="price flex col">
              <p>PRICE</p>
              <h2>{main_data?.price} ≈ <span>${Math.round(ethToUsd * main_data?.price)}</span></h2>
            </div>
            <div className="line"></div>
            <button>VIEW</button>
          </div>
          <div className="right-content flex">
            <img src={main_data?.image} alt="" />
          </div>
        </div>
      </div>
      <Featured />
      <SeriesFeatured />
    </div>
  );
};

export default Home;
