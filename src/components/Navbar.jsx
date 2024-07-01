import React, { useEffect } from "react";
import "./navbar.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";


const Navbar = ({ bar, setBar }) => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile); 
  // console.log(user);
  return (
    <div id="nav">
      <BiSolidFoodMenu className="icon" onClick={() => setBar(!bar)} />
      <h1>Shreemad Bhagwat Geeta</h1>
      <div>
        {
          token == null && <Link to="/login">Login</Link>
        }
        {
          token == null && <Link to="/signup">Signup</Link>
        }
        {
          user && <img src={user.image} alt="image here"/>
        }
      </div>

    </div>
  );
};

export default Navbar;
