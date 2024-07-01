import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const data = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Contributers",
    path: "/Contributers",
  },
  {
    title: "About us",
    path: "/about-us",
  },
];

function clickHandler(bar, setBar) {
  if (bar === true) {
    setBar(false);
  } else {
    setBar(true);
  }
}

const Sidebar = ({ bar, setBar }) => {
  return (
    <div onClick={() => clickHandler(bar, setBar)} className="Sidebar">
      {data.map((val, key) => {
        return (
          <div>
            <Link to={val.path}>{val.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
