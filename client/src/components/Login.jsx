import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { BiEnvelope, BiHide, BiKey, BiShow } from "react-icons/bi";
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
  const dispatch = useDispatch();
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
          <p className="text" style={{ cursor: "pointer" }}>
            Don't Have An Account?
          </p>
        </div>
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
