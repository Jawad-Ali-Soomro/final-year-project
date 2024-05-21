import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import "../styles/Home.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant.js";
import Featured from "../components/Featured.jsx";
import SeriesFeatured from "../components/FeatredSeries.jsx";
import { useNavigate } from "react-router-dom";
import { BiHelpCircle, BiLogoDiscordAlt , BiLogoTwitter } from "react-icons/bi";

const Home = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

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
  }, []);

  return (
    <div>
      <Header />
      <Banner />
      <div className="services flex">
        <img src="../public/wave.svg" alt="" className="bg" />
        <div className="img flex col">
          <img src="../public/service-1.png" alt="" className="img-1" />
          <div className="step flex">
            step 1
          </div>
          <h2>filter & discover</h2>
        </div>
        <div className="img flex col">
          <img src="../public/service-2.png" alt="" className="img-1" />
          <div className="step flex">
            step 2
          </div>
          <h2>connect wallet</h2>
        </div>
        <div className="img flex col">
          <img src="../public/service-3.png" alt="" className="img-1" />
          <div className="step flex">
            step 3
          </div>
          <h2>start selling</h2>
        </div>
        <div className="img flex col">
          <img src="../public/service-4.png" alt="" className="img-1" />
          <div className="step flex">
            step 4
          </div>
          <h2>earn money</h2>
        </div>
      </div>
      <div className="trending flex col">
        <h1>TRENDING</h1>
        <p>
          Art is the mirror where society sees its reflection, and in its
          trends, we find the whispers of tomorrow's culture
        </p>
        {main_data?.map((art) => (
          <div className="card flex" key={art._id}>
            <div className="left-content flex col">
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
                {art.series.map((series, index) => (
                  <div className="series inherit flex" key={index}>
                    <img src={series.image} alt="" />
                    <div className="info flex col">
                      <p>SERIES</p>
                      <h2>{series?.title?.substring(0,12)}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="price flex col">
                <p>PRICE</p>
                <h2>
                  {art.price} ≈ <span>${Math.round(ethToUsd * art.price)}</span>
                </h2>
              </div>
              <div className="line"></div>
              <button onClick={() => navigate(`/art/${art._id}`)}>VIEW</button>
            </div>
            <div className="right-content flex">
              <img src={art.image} alt="" />
            </div>
          </div>
        ))}
      </div>
      <Featured />
      <SeriesFeatured />
      <div className="brief flex col">
      <h1>The Art Market <span>OnCHain</span></h1>
     <div className="main-card flex">
     <div className="card-ser flex col">
        <BiHelpCircle className="icon" />
        <h2>help center</h2>
      </div>
      <div className="card-ser flex col">
        <BiLogoDiscordAlt className="icon" />
        <h2>join discord</h2>
      </div>
      <div className="card-ser flex col">
        <BiLogoTwitter className="icon" />
        <h2>join twitter</h2>
      </div>
     </div>
      </div>
    </div>
  );
};

export default Home;
