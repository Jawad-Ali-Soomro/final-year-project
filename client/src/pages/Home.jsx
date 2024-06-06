import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/Home.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant.js";
import Featured from "../components/Featured.jsx";
import SeriesFeatured from "../components/FeatredSeries.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { Circles, CirclesWithBar, ColorRing, LineWave , MutatingDots  } from "react-loader-spinner";

const Home = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const [top_data, set_top_data] = useState();

  const fetch_top_data = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/all`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleArray(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 3);
      set_top_data(randomFeaturedImages);
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/featured/images`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleArray(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 1);
      set_data(randomFeaturedImages);
    } catch (error) {
      console.error("Error fetching featured images:", error);
    }
  };
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch_data();
    fetch_top_data();
  }, []);

  return (
    <div>
      <Header />
      <Banner />
      <div className="trending flex">
        {
          main_data == undefined ? <ColorRing colors={["black"]} width={400} height={400} color="black" /> : main_data?.map((art) => (
            <div className="card flex" key={art._id}>
              <div className="right-content flex">
                <img src={art.image} alt="" />
              </div>
              <div className="left-content flex col">
                <div className="main-info flex col">
                  <h1>{art.title}</h1>
                  <div className="tags flex" style={{ gap: "10px" }}>
                    {art.tags.map((tag, index) => (
                      <div className="tag flex" key={index}>
                        <p>{tag}</p>
                      </div>
                    ))}
                  </div>
                  <div className="profile-series flex">
                    <div className="profile inherit flex">
                      <img src={art.owner.avatar} alt="" />
                      <div className="info flex col">
                        <p>ARTIST</p>
                        <h2>{art.owner.username}</h2>
                      </div>
                    </div>
                    {art.series?.splice(0,1)?.map((series, index) => (
                      <div className="series inherit flex" key={index}>
                        <div className="img-sect flex">
                        <img src={series.image} alt="" />
                        </div>
                        <div className="info flex col">
                          <p>SERIES</p>
                          <h2>{series?.title?.substring(0, 12)}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="price flex col">
                    <p>PRICE</p>
                    <h2>
                      {art.price} ≈{" "}
                      <span>${Math.round(ethToUsd * art.price)}</span>
                    </h2>
                  </div>
                  <div className="line"></div>
                  <button onClick={() => navigate(`/art/${art._id}`)}>
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <Featured />
      <SeriesFeatured />
      <Footer />
    </div>
  );
};

export default Home;
