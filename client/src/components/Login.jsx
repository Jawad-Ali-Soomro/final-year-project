import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import {
  BiArrowBack,
  BiAt,
  BiEnvelope,
  BiKey,
  BiLogIn,
  BiPlus,
  BiUser,
} from "react-icons/bi";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const img_data = [
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e%252F17%252F1c44ce4dc9386cf00f06abd8f88a46cf384d9c03c51450a05ca89616b7e0834e.jpeg?ixlib=js-3.8.0&width=550&height=550&fm=avif&fit=crop&quality=75&video=false&name=ImageMedium&auto=compress&s=c072b11362878bc8957b1fff03def981",
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e%252F9%252F4efbf1d1-9759-45bd-97b8-2b23d6d35983%252Furi%252Fimage-2024-02-28-10-59-mym2gh?ixlib=js-3.8.0&w=550&h=550&fit=crop&q=75&auto=format%2Ccompress&s=25a85841fc58511720d18795f4321661",
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e%252F16%252F92ab9e217e520f49d05ccb842543f60e108b0100ade65e68a847e578c8a2af67.jpeg?ixlib=js-3.8.0&width=550&height=550&fm=avif&fit=crop&quality=75&video=false&name=ImageMedium&auto=compress&s=414ebafee8207b4c8b36af652058794d",
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xca53bb6cdfcd5bf437bf4ac6d17c3b0e67d8a83e%252F8%252F6a58547074437022996bfe79db29ad1fdec71c73f05cb85dd579cfd5e3116baf.jpeg?ixlib=js-3.8.0&width=550&height=550&fm=avif&fit=crop&quality=75&video=false&name=ImageMedium&auto=compress&s=eddd2ccf8e5521d59a6d73c865ce5916",
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xCa53bB6cdfCD5Bf437bF4ac6d17c3b0e67d8a83E%252F19%252F034f452737734c56439bdaec2266dbe771cd78d47562166d1c1d3b2400b28c76.jpeg?ixlib=js-3.8.0&width=550&height=550&fm=avif&fit=crop&quality=75&video=false&name=ImageMedium&auto=compress&s=e16bd8a417867231099c5310c401a93e",
  ];
  const [login_step, set_login_step] = useState(1);
  const [sigunp_step, set_sigunp_step] = useState(1);
  const [step, set_step] = useState(0);
  const [randomImage, setRandomImage] = useState(
    "https://pixura.imgix.net/https%3A%2F%2Fstorage.googleapis.com%2Fsr_prod_artworks_bucket%2F0xCa53bB6cdfCD5Bf437bF4ac6d17c3b0e67d8a83E%252F19%252F034f452737734c56439bdaec2266dbe771cd78d47562166d1c1d3b2400b28c76.jpeg?ixlib=js-3.8.0&width=550&height=550&fm=avif&fit=crop&quality=75&video=false&name=ImageMedium&auto=compress&s=e16bd8a417867231099c5310c401a93e"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * img_data.length);
      setRandomImage(img_data[randomIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  const [show_pass, set_pass] = useState(false);
  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-container flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="toggler flex" onClick={(e) => e.stopPropagation()}>
          <button
            style={{
              background: `${step == 1 ? "#111" : "#eee"}`,
              color: `${step == 1 ? "white" : "black"}`,
            }}
            onClick={() => set_step(1)}
          >
            <BiPlus />
          </button>
          <button
            style={{
              background: `${step == 0 ? "#111" : "#eee"}`,
              color: `${step == 0 ? "white" : "black"}`,
            }}
            onClick={() => set_step(0)}
          >
            <BiLogIn />
          </button>
        </div>
        <div
          className="left flex col"
          style={{ background: `url(${randomImage})` }}
        >
          <div className="content flex col">
            <h1>{step == 0 ? "Greeting!" : "Hello!"}</h1>
            <p>
              {step == 0
                ? "We're Excited to Welcome You!!"
                : "Unlock Your Creativity – Join Now!"}
            </p>
          </div>
        </div>
        {step == 0 ? (
          <div data-content="Login" className="right flex col">
            <h1>Welcome</h1>
            <p>Fill The Credentials To Get You In!</p>
            <div className="main-input flex col">
              <div className="input-wrap flex">
                <BiEnvelope />
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-wrap flex">
                <BiKey />
                <input type="text" placeholder="Password" />
              </div>
            </div>

            <button>Login</button>
          </div>
        ) : (
          <div data-content="signup" className="right  flex col">
            <h1>Let's Start!</h1>
            <p style={{textTransform:'capitalize'}}>Follow All Steps to create your account!</p>
            <div className="step-sect flex">
              <div
                className="step flex"
                onClick={() => set_sigunp_step(1)}
                style={{
                  background: `${sigunp_step >= 1 ? "#111" : ""}`,
                  color: `${sigunp_step >= 1 ? "white" : "black"}`,
                }}
              ></div>
              <div className="line"></div>
              <div
                className="step flex"
                onClick={() => set_sigunp_step(2)}
                style={{
                  background: `${sigunp_step >= 2 ? "#111" : ""}`,
                  color: `${sigunp_step >= 2 ? "white" : "black"}`,
                }}
              ></div>
              <div className="line"></div>
              <div
                className="step flex"
                onClick={() => set_sigunp_step(3)}
                style={{
                  background: `${sigunp_step >= 3 ? "#111" : ""}`,
                  color: `${sigunp_step >= 3 ? "white" : "black"}`,
                }}
              ></div>
            </div>
            {sigunp_step == 1 ? (
              <div className="main-input flex col">
                <div className="input-wrap flex">
                  <BiEnvelope />
                  <input type="text" placeholder="Email" />
                </div>
                <div className="input-wrap flex">
                  <BiKey />
                  <input type="text" placeholder="Password" />
                </div>
              </div>
            ) : sigunp_step == 2 ? (
              <div className="main-input flex col">
                <div className="input-wrap flex">
                  <BiUser />
                  <input type="text" placeholder="Username" />
                </div>
                <div className="input-wrap flex">
                  <BiAt />
                  <input type="text" placeholder="Handle" />
                </div>
              </div>
            ) : sigunp_step == 3 ? (
              <div className="main-input flex col">
                <div className="input-wrap" style={{border:'none'}}>
                  <div className="avatar flex">
                    <input type="file" name="" id="" />
                  </div>
                </div>
              </div>
            ) : (
              this
            )}
            <button
              onClick={() =>
                sigunp_step <= 4 ? set_sigunp_step(sigunp_step + 1) : this
              }
            >
            {sigunp_step <3 ? "Next" : "signup"}
            </button>
          </div>
        )}
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
