import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import { BiEnvelope, BiHide, BiKey, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [show_pass, set_pass] = useState(false);
  return ReactDOM.createPortal(
    <div className="login-portal flex" onClick={onClose}>
      <div
        className="login-container flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="right flex col">
          <h1>WElcome</h1>
          <p>Please Login To Continue!</p>
          <div className="input-wrap flex">
            <BiEnvelope />
            <input type="text" placeholder="Enter Email Address" />
          </div>
          <div className="input-wrap flex">
            <BiKey />
            <input
              style={{ width: "240px" }}
              type={show_pass == true ? "text" : "password"}
              placeholder="Enter Password"
            />
            {show_pass == true ? (
              <BiShow onClick={() => set_pass(false)} />
            ) : (
              <BiHide onClick={() => set_pass(true)} />
            )}
          </div>
          <Link className="link">Forgot Password?</Link>
          <button>LOGIN</button>
          <p className="text" >
            Don't Have An Account? <Link style={{ textDecoration: "none" }}>Click Here!</Link>
          </p>
        </div>
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
