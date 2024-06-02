import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../constant";
import { useNavigate } from "react-router-dom";

const Spotlight = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();

  const fetch_data = async () => {
    try {
      const response = await axios.get(
        `${baseUserUrl}/get/664b6bc32cd61128324472be`
      );
      const featuredImages = response.data.data.art;
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
      <h1>Artist Spotlight : Botto <button>See all</button></h1>
      <p style={{fontSize:'.8rem'}}>Through his animations, Botto explores the impact of contemporary culture on our everyday lives, offering a unique and fresh perspective on the world around us.</p>
      <div className="featured-card flex">
        {main_data?.map((card_item) => {
          return (
            <div className="card-item flex col" key={card_item._id}>
              <div className="img-sect flex">
                <img src={card_item?.image} alt="" />
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
              <div
                className="profile flex"
                style={{
                  position: "absolute",
                  background: "whites",
                  width: "30px",
                  height: "30px",
                  top : '30px',
                  right: '30px',
                  border : 'none'
                }}
              >
              </div>
              <div className="price flex col">
                <p>PRICE</p>
                <h2>
                  {card_item?.price} ≈{" "}
                  <span>${Math.round(ethToUsd * card_item?.price)}</span>
                </h2>
              </div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spotlight;
