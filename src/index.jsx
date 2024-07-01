import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import {
  Router,
  BrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainHeader from "./components/MainHeader.jsx";
import Chapter from "./components/Chapter.jsx";
import Body from "./components/Body.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/reducer.js";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <Toaster/>
    <App />
  </BrowserRouter>
  </Provider>
);
