import React , {useState , useEffect} from "react";
import "../styles/Featured.scss";
import axios from 'axios'
import { baseArtUrl, ethToUsd } from "../constant";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate()
  const [main_data, set_data] = useState();
  const fetch_data = async () => {
    await axios.get(`${baseArtUrl}/get/featured/images`).then((res) => {
      set_data(res.data.data.splice(1,3));
    });
  };
  useEffect(() => {
    fetch_data();
  });
  return (
    <div className="featured flex col">
      <h1>FEATURED ART</h1>
      <p>
        Art is the mirror where society sees its reflection, and in its trends,
        we find the whispers of tomorrow's culture
      </p>
      <div className="featured-card flex">
        {
          main_data?.map((card_item) => {
            return <div className="card-item flex col">
              <img src={card_item?.image} alt="" />
              <div className="profile flex">
                <img src={card_item?.owner?.avatar} alt="" />
                <div className="info flex col">
                  <p>ARTIST</p>
                  <h2>{card_item?.owner?.username}</h2>
                </div>
              </div>
              <div className="price flex col">
                <p>PRICE</p>
                <h2>{card_item?.price} ≈ <span>${Math.round(ethToUsd * card_item?.price)}</span></h2>
              </div>
              <div className="line"></div>
              <button onClick={() => navigate(`/art/${card_item?._id}`)}>BUY</button>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default Featured;
