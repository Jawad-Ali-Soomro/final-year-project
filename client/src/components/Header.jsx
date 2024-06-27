import React, { useState, useEffect } from "react";
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
import { connectMetamask } from "../constant";
import Login from "./Login";

const Header = () => {
  const metaMaskId = window.localStorage.getItem("token");
  const active_link = window.location.pathname;
  const navigate = useNavigate();
  const [show_menu, set_menu] = useState(false);
  const [show_login, set_login] = useState(false);
  const openLogin = () => {
    set_login(true);
  };
  const closeLogin = () => {
    set_login(false);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(window.scrollY);
    };

    const handleStopScroll = () => {
      setIsScrolling(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', () => {
      setIsScrolling(true);
      clearTimeout(handleStopScroll);
      setTimeout(handleStopScroll, 150); // Adjust the timeout as needed
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleStopScroll);
    };
  }, [lastScrollY]);


  return (
    <div className={`header-wrap flex ${isVisible ? 'header--visible' : 'header--hidden'}`}>
      <div className="left-content flex">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="../public/logo.svg" alt="" />
        </div>
        <div className="search-bar flex">
          <button className="flex">
            <BiSearch />
          </button>
          <input type="text" placeholder="Search Arthub" />
        </div>
      </div>
      <div className="right-content flex">
        <ul className="flex">
        <li
            style={{
              borderBottom: `${active_link == "/" ? "2px solid" : "none"
                }`,
              paddingBottom: `${active_link == "/" ? "5px" : "none"}`,
            }}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            style={{
              borderBottom: `${active_link == "/explore" ? "2px solid" : "none"
                }`,
              paddingBottom: `${active_link == "/explore" ? "5px" : "none"}`,
            }}
            onClick={() => navigate("/explore")}
          >
            Arts
          </li>
          <li
            style={{
              borderBottom: `${active_link == "/explore/series" ? "2px solid" : "none"
                }`,
              paddingBottom: `${active_link == "/explore/series" ? "5px" : "none"
                }`,
            }}
            onClick={() => navigate("/explore/series")}
          >
            Series
          </li>
          <li style={{
            borderBottom: `${active_link == "/featured" ? "2px solid" : "none"
              }`,
            paddingBottom: `${active_link == "/featured" ? "5px" : "none"
              }`,
          }}
            onClick={() => navigate("/featured")}>Featured</li>
          <div className="menu flex col" onClick={() => set_menu(!show_menu)}>
            <div></div>
            <div></div>
            <div></div>
            {show_menu == true ? (
              <div className="main-menu flex col">
                <ul className="flex col">
                  <li>Profile</li>
                  <li>Register</li>
                </ul>
                <div className="line"></div>
                <ul className="flex col">
                  <li>Help Center</li>
                  <li>Featured Art</li>
                  <li>Featured Series</li>
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
          <button
            onClick={() =>
              metaMaskId !== null || undefined ? openLogin() : connectMetamask()
            }
          >
            {metaMaskId !== null || undefined ? "LOGIN" : "CONNECT"}
          </button>
        </ul>
        {show_login === true && <Login onClose={closeLogin} />}
      </div>
    </div>
  );
};

export default Header;
