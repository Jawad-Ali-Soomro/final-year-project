import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import {
  BiEnvelope,
  BiHide,
  BiKey,
  BiLogIn,
  BiPlusCircle,
  BiShow,
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
            <h1>WElcome</h1>
            <p style={{ textTransform: "uppercase" }}>
              Please Login To Continue!
            </p>
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
          <div className="right register flex col">
            
          </div>
        )}
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
