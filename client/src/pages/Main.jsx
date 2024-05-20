import React, { useEffect, useState } from "react";
import "../styles/Main.scss";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, ethToUsd } from "../constant";

const Main = () => {
  const [main_data, set_data] = useState();
  const { id } = useParams();
  const fetch_data = async () => {
    await axios
      .get(`${baseArtUrl}/get/art/${id}`)
      .then((res) => set_data(res.data.data));
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div>
      <Header />
      <div className="main-top flex">
        <div className="right-content flex col">
          <h1>{main_data?.title}</h1>
          <div className="tags flex">
            {main_data?.tags?.map((tag) => {
              return (
                <div className="tag flex" key={tag?._id}>
                  {tag}
                </div>
              );
            })}
          </div>
          <div className="owner-series flex">
            <div className="content flex">
              <img src={main_data?.owner?.avatar} alt="" />
              <div className="info flex col">
                <p>ARTIST</p>
                <h2>{main_data?.owner?.username}</h2>
              </div>
            </div>
            {main_data?.series?.map((series) => {
              return (
                <div className="content flex">
                  <img src={series?.image} alt="" />
                  <div className="info flex col">
                    <p>SERIES</p> 
                    <h2>{series?.title?.substring(0,10)}...</h2>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price flex col">
            <p>PRICE</p>
            <h2>
              {main_data?.price} ≈{" "}
              <span>${Math.round(ethToUsd * main_data?.price)}</span>
            </h2>
          </div>
          <div className="line"></div>
          <div className="btns flex col">
          <button>BUY</button>
          <button>OFFER</button>
          </div>
        </div>
        <div className="left-image">
          <img src={main_data?.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Main;
