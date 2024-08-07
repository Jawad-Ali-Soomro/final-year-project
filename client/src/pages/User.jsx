import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Syncer from "../components/Syncer";
import axios from "axios";
import "../styles/User.scss";
import Footer from '../components/Footer'
import '../styles/Explore.scss'
import { baseUserUrl, ethToUsd } from "../constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiUserPlus,
} from "react-icons/bi";

const User = () => {
  const [main_data, set_data] = useState();
  const { id } = useParams();
  const fetch_data = async () => {
    await axios.get(`${baseUserUrl}/get/${id}`).then((res) => {
      set_data(res.data.data);
    });
  };
  useEffect(() => {
    fetch_data();
  });
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <div className="main-wrap flex">
        <div className="left flex col">
          {main_data == undefined ? (
            <Syncer />
          ) : (
            <div className="info-left flex col">
              <div className="profile flex">
                <img src={main_data?.avatar} alt="" />
                <div className="info flex col">
                  <h3>{main_data?.username}</h3>
                  <div className="main flex">
                    <p>@{main_data?.handle}</p>
                    <p>
                      {main_data?.wallet_address.substring(0, 5)}...
                      {main_data?.wallet_address?.substring(15, 10)}
                    </p>
                  </div>
                  <div className="btns flex">
                    <div className="more-opt flex col">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="followers flex">
                <div className="card flex col">
                  <p>Arts Created</p>
                  <h1>{main_data?.art?.length}</h1>
                </div>
                <div className="card flex col">
                  <p>Followers</p>
                  <h1>{main_data?.followers?.length}</h1>
                </div>
                <div className="card flex col">
                  <p>Following</p>
                  <h1>{main_data?.following?.length}</h1>
                </div>
              </div>
              <div className="links flex">
                {main_data?.links[0]?.facebook !== "" ? (
                  <Link
                    to={main_data?.links[0]?.facebook}
                    target="_blank"
                    className="link flex"
                  >
                    <BiLogoFacebook />
                  </Link>
                ) : (
                  this
                )}
                {main_data?.links[0]?.twitter !== "" ? (
                  <Link
                    to={main_data?.links[0]?.twitter}
                    target="_blank"
                    className="link flex"
                  >
                    <BiLogoTwitter />
                  </Link>
                ) : (
                  this
                )}
                {main_data?.links[0]?.instagram !== "" ? (
                  <Link
                    to={main_data?.links[0]?.instagram}
                    target="_blank"
                    className="link flex"
                  >
                    <BiLogoInstagram />
                  </Link>
                ) : (
                  this
                )}
              </div>
            </div>
          )}
        </div>
        <div className="right flex">
          {main_data == undefined ? (
            <Syncer />
          ) : (
            <div className="img-sect" onClick={() => {navigate(`/art/${main_data?.art[0]?._id}`)}}>
              {<img src={main_data?.art[0]?.image} alt="" />}
            </div>
          )}
        </div>
      </div>
      <div className="bottom flex col">
      <div className="featured-card flex">
        {main_data == undefined ? (
          <Syncer />
        ) : (
          main_data?.art?.map((card_item) => {
            return (
              <div
                className="card-item flex col"
                style={{ paddingBottom: "20px" }}
                key={card_item._id}
              >
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
                  <div className="left flex" onClick={() => navigate(`/user/${main_data?._id}`) + window.location.reload()}>
                    <img src={main_data?.avatar} alt="" />
                    <div className="info flex col">
                      <h2 style={{marginLeft:'10px'}}>{main_data?.username}</h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
