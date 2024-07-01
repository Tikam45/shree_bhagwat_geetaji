import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { SignatureKind } from "typescript";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../apiconnect/operations"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({email: "",  password: "" })
  // const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData


  function handleOnChange(e) {
    setFormData( (prevData) =>({ ...prevData , [e.target.name] : e.target.value })                        
)}

  
  function handleOnSubmit(e){
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleOnChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleOnChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="toggle-link">
        Don't have an account? Signup
      </Link>
    </div>
  );
};

export default Login;
