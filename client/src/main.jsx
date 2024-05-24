import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Toolkit/Reducers.js'

const store = configureStore({
  reducer: {userReducer},
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
