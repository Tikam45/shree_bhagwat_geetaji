import React from "react";
import { Link } from "react-router-dom";
// import "./Chapter.css";

const Chapter = ({ count }) => {
  // const data = getData({count});
  return (
    <div>
      <Link className="chapter_count" to={`/chapter/${count}`}>
        Chapter {count}
      </Link>
    </div>
  );
};

export default Chapter;
