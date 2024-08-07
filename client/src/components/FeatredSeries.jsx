import React, { useState, useEffect } from "react";
import "../styles/Featured.scss";
import axios from "axios";
import { baseSeriesUrl } from "../constant";
import { useNavigate } from "react-router-dom";
import Syncer from "./Syncer";

const SeriesFeatured = () => {
  const navigate = useNavigate();
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    return await axios.get(`${baseSeriesUrl}/get/all`).then((res) => {
      set_data(res.data.data.splice(0, 3));
    });
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div className="featured flex col">
      <h1>
        Series <button>See All</button>
      </h1>
      {main_data == undefined ? (
        <Syncer />
      ) : (
        <div className="featured-card flex">
          {main_data?.map((card_item) => {
            return (
              <div className="card-item flex col" key={card_item._id}>
                <div
                  className="img-sect flex"
                  onClick={() => navigate(`/series/${card_item?._id}`)}
                >
                  <img src={card_item?.image} alt="" />
                </div>
                <h2
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    paddingLeft: "10px",
                  }}
                >
                  {card_item?.title}
                </h2>

                <div
                  className="price flex"
                  style={{ alignItems: "center", gap: "0px" }}
                >
                  <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.5)" }}>
                    {card_item?.art?.length} Artworks
                  </p>
                </div>
                <div className="line"></div>
                <div
                  className="profile flex"
                  onClick={() =>
                    navigate(`/user/${card_item?.owner?._id}`) +
                    window.location.reload()
                  }
                >
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
      )}
    </div>
  );
};

export default SeriesFeatured;
