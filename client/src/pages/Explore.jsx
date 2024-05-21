import React, { useEffect, useState } from "react";
import "../styles/Explore.scss";
import { FaFilter } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant";
import "../styles/Featured.scss";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    await axios.get(`${baseArtUrl}/get/all`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div className="explore-main featured flex col">
      <Header />
      <div className="top flex">
        <h1>Explore</h1>
        <button>
          FILTERS <FaFilter />
        </button>
        <div className="length flex">
          <h2>{main_data?.length} Results Found!</h2>
        </div>
      </div>
      <div className="featured-card flex">
        {main_data?.map((card_item) => {
          return (
            <div className="card-item flex col" key={card_item._id} onClick={() => navigate(`/art/${card_item._id}`)}>
              <div className="main-img">
                <img src={card_item?.image} alt="" className="main-img" />
              </div>
              <div className="profile flex">
                <img src={card_item?.owner?.avatar} alt="" />
                <div className="info flex col">
                  <h2>{card_item?.owner?.username}</h2>
                </div>
              </div>
              <div className="line"></div>
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

export default Explore;
