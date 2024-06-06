import React, { useEffect, useState } from "react";
import "../styles/Explore.scss";
import { FaFilter } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, baseSeriesUrl, ethToUsd } from "../constant";
import "../styles/Featured.scss";
import { useNavigate } from "react-router-dom";
import { BiMoveVertical } from "react-icons/bi";
import Footer from "../components/Footer";
import Syncer from "../components/Syncer";

const Series = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    await axios.get(`${baseSeriesUrl}/get/all`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  console.log(main_data);
  return (
    <div className="explore-main featured flex col">
      <Header />
      <div className="top flex">
        <h1 className="flex">
          series <span>Discover Series & Collect Rare Items</span>
        </h1>
        <button className="flex">
          Filters
          <img src="../public/filter.svg" alt="" />
        </button>
        <div className="length flex">
          <h2>{main_data?.length} Results Found!</h2>
        </div>
      </div>
      <div className="featured-card flex">
        {main_data == undefined ? (
          <Syncer />
        ) : (
          main_data?.map((card_item) => {
            return (
              <div className="card-item flex col" key={card_item._id}>
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
                <div className="price flex">
                  <h2 style={{ fontWeight: "400" }}>
                    Total Arts ≈ {card_item?.art?.length}
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
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Series;
