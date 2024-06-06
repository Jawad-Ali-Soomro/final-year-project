import React, { useEffect, useState } from "react";
import "../styles/Main.scss";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { baseArtUrl, baseUserUrl, ethToUsd } from "../constant";
import Footer from "../components/Footer";
import { ColorRing } from "react-loader-spinner";

const Main = () => {
  const [main_data, set_data] = useState();
  const [more_data, set_more] = useState();
  const [show_desc , set_desc] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams();
  const fetch_data = async () => {
    await axios
      .get(`${baseArtUrl}/get/art/${id}`)
      .then((res) => set_data(res.data.data));
  };
  const fetch_more = async () => {
    await axios
      .get(`${baseUserUrl}/get/${main_data?.owner?._id}`)
      .then((res) => {
        set_more(res.data.data.art.splice(0, 4));
      });
  };
  useEffect(() => {
    fetch_data();
    fetch_more();
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
                <div className="content flex" key={series._id}>
                  <img src={series?.image} alt="" />
                  <div className="info flex col">
                    <p>SERIES</p>
                    <h2>{series?.title?.substring(0, 10)}...</h2>
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
        <div className="left-image flex">
          {
            main_data == undefined ? <ColorRing colors={["black"]} width={200} height={200} /> : <img src={main_data?.image} alt="" />
          }
        </div>
      </div>
      <div className="bottom flex">
        <div className="description flex col">
          <h1>Description</h1>
          <div className="desc flex col">
            {
              show_desc == false ? 
              <p>{main_data?.description.substring(0,120)}...</p> : <p>{main_data?.description}</p>
            }
            <button onClick={() => set_desc(!show_desc)}>{show_desc == true ? "Show Less" : "Show More"}</button>
          </div>
        </div>
        <div className="right-owner flex col">
          <h1>History</h1>
          {main_data?.previous_owners?.map((owner) => {
            const createdAtDate = new Date(main_data.uploaded_at);
            const year = createdAtDate.getFullYear();
            const month = createdAtDate.getMonth() + 1;
            const date = createdAtDate.getDate();
            const hours = createdAtDate.getHours();
            const minutes = createdAtDate.getMinutes();
            const seconds = createdAtDate.getSeconds();
            return (
              <div className="owner-card flex">
                <img src={owner?.avatar} alt="" />
                <div className="info">
                  <p>Minted By {owner?.handle}</p>
                  <p>
                    {date}-{month}-{year}{" "}
                    <span>
                      ({hours}:{minutes})
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="more-arts flex col">
        <h1>
          More By {main_data?.owner?.username} 
          <button>Profile</button>
        </h1>
        <div className="wrapper flex">
         {
          more_data == undefined ? <ColorRing width={200} height={200} colors={["black"]} /> :  more_data?.map((card_item) => {
            return (
              <div className="card flex col">
                <div className="img-sect flex">
                <img src={card_item?.image} alt="" onClick={() => navigate(`/art/${card_item._id}`) + window.location.reload()} />
                </div>
                <div className="info flex col">
                  <h3>{card_item?.title?.substring(0, 22)}...</h3>
                  <div className="owner flex">
                    <img src={main_data?.owner?.avatar} alt="" />
                    <p>{main_data?.owner?.username}</p>
                  </div>
                  <div className="line"></div>
                  <div className="price flex col">
                    <p>Price</p>
                    <h3>{card_item?.price} ≈ <span>${Math.round(card_item?.price * ethToUsd)}</span></h3>
                  </div>
                </div>
              </div>
            );
          })
         }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
