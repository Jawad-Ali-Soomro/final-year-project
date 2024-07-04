import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant";
import { useNavigate } from "react-router-dom";
import Syncer from "./Syncer";

const Featured = () => {
  const navigate = useNavigate();
  const [show_menu, set_menu] = useState(false);
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
      <h1>Featured Art <button>see all</button></h1>
      {
        main_data == undefined ? <Syncer /> : <div className="featured-card flex">
        {main_data?.map((card_item) => {
          return (
            <div className="card-item flex col" key={card_item._id}>
              <div className="img-sect flex">
                <img src={card_item?.image} alt="" onClick={() => navigate(`/art/${card_item?._id}`) + window.location.reload()} />
              </div>
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  paddingLeft: "10px",
                }}
              >
                {card_item?.title}
              </h2>
              <div className="price flex col">
                <p>PRICE</p>
                <h2>
                  {card_item?.price} ≈{" "}
                  <span>${Math.round(ethToUsd * card_item?.price)}</span>
                </h2>
              </div>
                <div className="line"></div>
              <div className="profile flex" onClick={() => navigate(`/user/${card_item?.owner?._id}`)}>
                <div className="left flex">
                  <img src={card_item?.owner?.avatar} alt="" />
                  <div className="info flex col">
                    <h2>{card_item?.owner?.username}</h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      }
    </div>
  );
};

export default Featured;
