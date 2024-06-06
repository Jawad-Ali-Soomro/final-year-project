import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Syncer from "../components/Syncer";
import axios from "axios";
import "../styles/User.scss";
import { baseUserUrl } from "../constant";
import { Link, useParams } from "react-router-dom";
import {
  BiDiamond,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
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
  console.log(main_data);
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
                    <button>Follow</button>
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
            <div className="img-sect">
              {<img src={main_data?.art[0]?.image} alt="" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
