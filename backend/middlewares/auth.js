const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// atuh
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.body.token ||
      req.cookie.token ||
      req.header("Authorisation").replace("Bearer", "");

    // If token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // decode ho gaya token matlab jo payload mai values di thi vo sab yaha normal form mai aa gayi hai
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
