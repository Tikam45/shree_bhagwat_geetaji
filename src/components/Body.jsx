import React from "react";
import Chapter from "./Chapter";
import "./Body.css";

const Body = () => {
  const chapters = Array.from({ length: 18 }, (_, index) => index + 1);

  return (
    <ul className="body">
      {chapters.map((cnt) => (
        <li className="chapter_number" key={cnt}>
          <Chapter count={cnt} />
        </li>
      ))}
    </ul>
  );
};

export default Body;
