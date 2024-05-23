import React, { useEffect, useState } from "react";
import "../styles/Explore.scss";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant";
import "../styles/Featured.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

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
        <button className="flex">
          Filters
          <img src="../public/filter.svg" alt="" />
        </button>
        <div className="length flex">
          <h2>{main_data?.length} Results Found!</h2>
        </div>
      </div>
      <div className="featured-card flex" >
        {main_data?.map((card_item) => {
          return (
            <div className="card-item flex col" style={{paddingBottom:'20px'}} key={card_item._id}>
              <div
                className="main-img"
                onClick={() => navigate(`/art/${card_item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={card_item?.image} alt="" className="main-img" />
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
              <div className="profile flex">
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
      <Footer />
    </div>
  );
};

export default Explore;
