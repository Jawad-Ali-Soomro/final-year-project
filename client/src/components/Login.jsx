import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import {
  BiEnvelope,
  BiHandicap,
  BiHide,
  BiKey,
  BiLogIn,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiMenuAltLeft,
  BiPlusCircle,
  BiSearch,
  BiShow,
  BiUser,
} from "react-icons/bi";
import { FaSign, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUserUrl } from "../constant";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../Toolkit/Actions";
import toast from "react-hot-toast";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [email, set_email] = useState();
  const [password, set_password] = useState();
  const [coming_data, set_data] = useState();
  const [step, set_step] = useState(0);
  const login_fn = async () => {
    const user_info = await axios.post(`${baseUserUrl}/login`, {
      email,
      password,
    });
    user_info.data?.message == "Logged In!"
      ? toast.success(`Welcom Mr ${user_info?.data?.data?.username}`) +
        set_data(user_info?.data?.data)
      : toast.error(`${user_info?.data?.message}`);
  };
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
            <BiPlusCircle />
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
        {step == 0 ? (
          <div className="right flex col">
            <h1>Welcome</h1>
            <p>Please Login To Continue!</p>
            <div className="input-wrap flex">
              <BiEnvelope />
              <input
                type="text"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => set_email(e.target.value)}
              />
            </div>
            <div className="input-wrap flex">
              <BiKey />
              <input
                style={{ width: "240px" }}
                type={show_pass == true ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
              />
              {show_pass == true ? (
                <BiShow onClick={() => set_pass(false)} />
              ) : (
                <BiHide onClick={() => set_pass(true)} />
              )}
            </div>
            <Link className="link">Forgot Password?</Link>
            <button onClick={() => login_fn()}>LOGIN</button>
          </div>
        ) : (
          <div className="register  flex">
            <div className="right-card flex  col">
              <h1>welcome</h1>
              <p>Create your account to get started!</p>
              <div className="input-wrap flex">
                <BiEnvelope className="icon" />
                <input type="text" placeholder="Enter Email Address" />
              </div>
              <div className="input-wrap flex">
                <BiUser className="icon" />
                <input type="text" placeholder="Enter Username" />
              </div>
              <div className="input-wrap flex">
                <BiLogoFacebook className="icon" />
                <input type="text" placeholder="Enter Facebook Link" />
              </div>
            </div>
            <div className="right-card flex  col">
              <div className="input-wrap flex">
                <BiLogoInstagram className="icon" />
                <input type="text" placeholder="Enter Instagram Link" />
              </div>
              <div className="input-wrap flex">
                <BiLogoTwitter className="icon" />
                <input type="text" placeholder="Enter Twitter Link" />
              </div>
              <div className="input-wrap flex">
                <BiMenuAltLeft className="icon" />
                <input type="text" placeholder="About Yourself" />
              </div>
              <div className="input-wrap flex">
                <BiKey />
                <input
                  style={{ width: "240px" }}
                  type={show_pass == true ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => set_password(e.target.value)}
                />
                {show_pass == true ? (
                  <BiShow onClick={() => set_pass(false)} />
                ) : (
                  <BiHide onClick={() => set_pass(true)} />
                )}
              </div>
              <button
                style={{
                  border: "1px solid rgba(0,0,0,0.3)",
                  background: "transparent",
                  color: "#111",
                }}
              >
                Upload{" "}
              </button>
              <button>Register</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
