import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import {
  BiAt,
  BiEnvelope,
  BiKey,
  BiLogIn,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiPlus,
  BiUser,
} from "react-icons/bi";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [sigunp_step, set_sigunp_step] = useState(1);
  const [step, set_step] = useState(0);
  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-container flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="toggler flex" onClick={(e) => e.stopPropagation()}>
          <button
            style={{
              background: `${step == 1 ? "white" : "#111"}`,
              color: `${step == 1 ? "black" : "white"}`,
            }}
            onClick={() => set_step(1)}
          >
            <BiPlus />
          </button>
          <button
            style={{
              background: `${step == 0 ? "white" : "#111"}`,
              color: `${step == 0 ? "black" : "white"}`,
            }}
            onClick={() => set_step(0)}
          >
            <BiLogIn />
          </button>
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
            <p style={{ textTransform: "capitalize" }}>
              Follow All Steps to create your account!
            </p>
            <div className="step-sect flex">
              <div
                className="step flex"
                onClick={() => set_sigunp_step(1)}
                style={{
                  background: `${sigunp_step >= 1 ? "#fff" : ""}`,
                  color: `${sigunp_step >= 1 ? "white" : "black"}`,
                }}
              ></div>
              <div
                className="step flex"
                onClick={() => set_sigunp_step(2)}
                style={{
                  background: `${sigunp_step >= 2 ? "#fff" : ""}`,
                  color: `${sigunp_step >= 2 ? "white" : "black"}`,
                }}
              ></div>
              <div
                className="step flex"
                onClick={() => set_sigunp_step(3)}
                style={{
                  background: `${sigunp_step >= 3 ? "#fff" : ""}`,
                  color: `${sigunp_step >= 3 ? "white" : "black"}`,
                }}
              ></div>
              <div
                className="step flex"
                onClick={() => set_sigunp_step(4)}
                style={{
                  background: `${sigunp_step >= 4 ? "#fff" : "#111"}`,
                  color: `${sigunp_step >= 4 ? "white" : "black"}`,
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
                  <BiLogoFacebook />
                  <input type="text" placeholder="Enter Facebook Link" />
                </div>
              </div>
            ) : sigunp_step == 3 ? (
              <div className="main-input flex col">
                <div className="input-wrap flex">
                  <BiLogoTwitter />
                  <input type="text" placeholder="Enter Twitter  Link" />
                </div>
                <div className="input-wrap flex">
                  <BiLogoInstagram />
                  <input type="text" placeholder="Enter Instagram Link" />
                </div>
              </div>
            ) : sigunp_step == 4 ? (
              <div className="main-input flex col">
                <div className="input-wrap" style={{ border: "none" }}>
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
              {sigunp_step < 4 ? "Next" : "signup"}
            </button>
          </div>
        )}
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
