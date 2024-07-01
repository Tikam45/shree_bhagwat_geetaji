import { useState, useEffect } from "react";
import getSlokData from "../hooks/getSlokData";
import { useParams, useLocation, Link, useNavigate, useFormAction } from "react-router-dom";
import "./slokData.css";
import { endpoints } from "../apiconnect/apis"
import { getNote, postNote } from "../apiconnect/operations";
import { useSelector } from "react-redux";

const SlokDataPage = () => {
  const { chapter, verses_count, slok } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [inputnote, setInputnote] = useState("");

  const navigate = useNavigate();
  const {user} = useSelector(state => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSlokData({ chapter, slok });
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slok, chapter]);

  useEffect(() =>{
    if(user){
      getNote({setDescription, chapter, slok, user});
    }
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }


  const handleOnClick = () =>{
    postNote({chapter, slok, description: inputnote, setDescription, navigate, user});
  }

  const handleOnChange = (e) => {
    setInputnote(e.target.value);
  }

  return (
    <div className="slok-data-page">
      <h1 className="slok-head">{data.slok}</h1>
      <p className="translation">{data.rams.ht}</p>
      <p className="description">{data.rams.hc}</p>
      <p className="verse-info">
        {slok}/{verses_count}
      </p>
      <div className="buttons">
        {Number(slok) > 1 && (
          <Link
            to={`/slok/${chapter}/${verses_count}/${Number(slok) - 1}`}
            className="link-button"
          >
            Previous
          </Link>
        )}
        {Number(slok) < verses_count && (
          <Link
            className="link-button"
            to={`/slok/${chapter}/${verses_count}/${Number(slok) + 1}`}
          >
            Next
          </Link>
        )}
      </div>

      <div class="text-container">
        <textarea class="note-area" name="noteArea" id="" onChange={handleOnChange}></textarea>
        <button class="add-note-button" onClick={handleOnClick}>Add Note</button>
      </div>
      <div class="description">
        {description}
      </div>

    </div>
  );
};

export default SlokDataPage;
