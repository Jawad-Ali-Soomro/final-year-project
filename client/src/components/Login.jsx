import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.scss";
import {
  BiArrowBack,
  BiArrowFromRight,
  BiArrowToRight,
  BiLeftArrow,
  BiLogIn,
  BiPlus,
  BiRightArrow,
} from "react-icons/bi";

const loginPortal = document.getElementById("loginPortal");

const Login = ({ onClose }) => {
  const [login_step, set_login_step] = useState(1);
  const [sigunp_step, set_sigunp_step] = useState(1);
  const [step, set_step] = useState(0);
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
        {step == 0 ? (
          <div className="right flex col">
            <h1>access account!</h1>
            <div className="step-sect flex">
              <BiArrowBack
                className="icon"
                onClick={() =>
                  login_step > 1
                    ? set_login_step(login_step - 1)
                    : set_login_step(1)
                }
              />
              <div className="step flex">
                <p>{login_step}</p>
              </div>
              <BiArrowBack
                className="back icon"
                onClick={() => set_login_step(login_step + 1)}
              />
            </div>
            {login_step == 1 ? (
              <div className="input-wrap flex col">
                <p>Email Address</p>
                <input type="text" />
              </div>
            ) : login_step == 2 ? (
              <div className="input-wrap flex col">
                <p>Password</p>
                <input type="text" />
              </div>
            ) : (
              this
            )}

            <button onClick={() => set_login_step(login_step + 1)}>
              {login_step == 1 ? "Next" : login_step == 2 ? "Login" : this}
            </button>
          </div>
        ) : (
          <div className="right  flex col">
            <h1>create Account!</h1>
            <div className="step-sect flex">
              <BiArrowBack
                className="icon"
                onClick={() =>
                  sigunp_step > 1
                    ? set_sigunp_step(sigunp_step - 1)
                    : set_sigunp_step(1)
                }
              />
              <div className="step flex">
                <p>{sigunp_step}</p>
              </div>
              <BiArrowBack
                className="back icon"
                onClick={() => set_sigunp_step(sigunp_step + 1)}
              />
            </div>
            {sigunp_step == 1 ? (
              <div className="input-wrap flex col">
                <p>Email Address</p>
                <input type="text" />
              </div>
            ) : sigunp_step == 2 ? (
              <div className="input-wrap flex col">
                <p>Password</p>
                <input type="text" />
              </div>
            ) : sigunp_step == 5 ? (
              <div className="avatar flex">
                <input type="file" name="" id="" />
              </div>
            ) : sigunp_step == 3 ? <div className="input-wrap flex col">
              <p>Username</p>
              <input type="text" />
            </div> : sigunp_step == 4 ? <div className="input-wrap flex col">
            <p>Handle</p>
            <input type="text" />
            </div> : (
              this
            )}
            <button onClick={() => sigunp_step <= 5 ? set_sigunp_step(sigunp_step + 1) : this}>
              {sigunp_step <= 4 ? "Next" : sigunp_step >=5 ? "SIGNUp" : this}
            </button>
          </div>
        )}
      </div>
    </div>,
    loginPortal
  );
};

export default Login;
