import React from "react";
import "../styles/Header.scss";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="header-wrap flex">
      <div className="left-content flex">
        <div className="logo">
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
          <li>ARTS</li>
          <li>SERIES</li>
          <li>TRENDING</li>
          <li>FEATURED</li>
          <div className="menu flex col">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <button>CONNECT</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
