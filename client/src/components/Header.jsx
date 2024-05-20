import React, { useState } from "react";
import "../styles/Header.scss";
import {
  BiLogoDiscordAlt,
  BiLogoFacebookSquare,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoTwitter,
  BiSearch,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const active_link = window.location.pathname;
  const navigate = useNavigate();
  const [show_menu, set_menu] = useState(false);
  return (
    <div className="header-wrap flex">
      <div className="left-content flex">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="../public/logo.svg" alt="" />
        </div>
        <div className="search-bar flex">
          <button className="flex">
            <BiSearch />
          </button>
          <input type="text" placeholder="SEARCH ARTHUB" />
        </div>
      </div>
      <div className="right-content flex">
        <ul className="flex">
          <li
            style={{
              borderBottom: `${
                active_link == "/explore" ? "2px solid" : "none"
              }`,
              paddingBottom: `${active_link == "/explore" ? "5px" : "none"}`,
              fontWeight: `${active_link == "/explore" ? "400" : "300"}`,
            }}
            onClick={() => navigate('/explore')}
          >
            ARTS
          </li>
          <li>SERIES</li>
          <li>TRENDING</li>
          <li>FEATURED</li>
          <div className="menu flex col" onClick={() => set_menu(!show_menu)}>
            <div></div>
            <div></div>
            <div></div>
            {show_menu == true ? (
              <div className="main-menu flex col">
                <ul className="flex col">
                  <li>PROFILE</li>
                  <li>REGISTER</li>
                </ul>
                <div className="line"></div>
                <ul className="flex col">
                  <li>HELP CENTER</li>
                  <li>FEATURED ART</li>
                  <li>FEATURED SERIES</li>
                </ul>
                <div className="line"></div>
                <div className="links flex">
                  <Link className="link">
                    <BiLogoFacebookSquare />
                  </Link>
                  <Link className="link">
                    <BiLogoInstagram />
                  </Link>
                  <Link className="link">
                    <BiLogoTwitter />
                  </Link>
                  <Link className="link">
                    <BiLogoDiscordAlt />
                  </Link>
                  <Link className="link">
                    <BiLogoGithub />
                  </Link>
                </div>
              </div>
            ) : (
              this
            )}
          </div>
          <button>CONNECT</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
