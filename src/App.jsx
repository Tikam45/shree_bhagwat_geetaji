import "./styles.css";
import { useState } from "react";
import { Routes, Router, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import getData from "./hooks/getData";
import Body from "./components/Body";
import Home from "./pages/Homepage";
import SlokPage from "./components/SlokPage";
import SlokDataPage from "./components/SlokDataPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import Auth from "./components/Auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  const [bar, setBar] = useState(false);
  return (
    <div className="mainhead">
      <Navbar bar={bar} setBar={setBar} />
      {bar && <Sidebar bar={bar} setBar={setBar} />}
      <div className="subhead">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-email" element={<VerifyEmail/
          >} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/chapter/:count" element={<SlokPage />} />
          <Route
            path="/slok/:chapter/:verses_count/:slok"
            element={<SlokDataPage />}
          />
        </Routes>
      </div>
    </div>
  );
}
