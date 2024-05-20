import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    try {
      const response = await axios.get(`${baseArtUrl}/get/featured/images`);
      const featuredImages = response.data.data;
      const shuffledImages = shuffleArray(featuredImages);
      const randomFeaturedImages = shuffledImages.slice(0, 3);
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
    <div className="featured flex col">
      <h1>FEATURED ART</h1>
      <p>
        Art is the mirror where society sees its reflection, and in its trends,
        we find the whispers of tomorrow's culture
      </p>
      <div className="featured-card flex">
        {main_data?.map((card_item) => {
          return (
            <div className="card-item flex col">
              <div className="img-sect flex">
                <img src={card_item?.image} alt="" />
              </div>
              <div className="profile flex">
                <img src={card_item?.owner?.avatar} alt="" />
                <div className="info flex col">
                  <p>ARTIST</p>
                  <h2>{card_item?.owner?.username}</h2>
                </div>
              </div>
              <div className="price flex col">
                <p>PRICE</p>
                <h2>
                  {card_item?.price} ≈{" "}
                  <span>${Math.round(ethToUsd * card_item?.price)}</span>
                </h2>
              </div>
              <div className="line"></div>
              <button onClick={() => navigate(`/art/${card_item?._id}`)}>
                BUY
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
