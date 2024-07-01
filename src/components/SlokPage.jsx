import React, { useEffect, useState } from "react";
import getData from "../hooks/getData";
import { useParams, useNavigate } from "react-router-dom";
import "./SlokPage.css";

const SlokPage = () => {
  const { count } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData({ count });
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [count]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  const goToSlokDataPage = () => {
    navigate(`/slok/${count}/${data.verses_count}/1`, {
      state: {
        verses_count: data.verses_count,
      },
    });
  };

  return (
    <div className="slok-page">
      <h1 className="slok-title">
        {data.chapter_number} {data.name}
      </h1>
      <h5 className="verses-count">No. of Verses: {data.verses_count}</h5>
      <p className="summary-en">{data.summary.en}</p>
      <p className="summary-hi">{data.summary.hi}</p>
      <button className="goto-slok-button" onClick={goToSlokDataPage}>
        Go to Slok
      </button>
    </div>
  );
};

export default SlokPage;
