const express = require("express");
const router = express.Router();

const { login, signUp, sendOTP } = require("../controllers/Auth");
const {createNote, getNote} = require("../controllers/Notes")

router.post("/auth/login", login);
router.post("/auth/signup", signUp);
router.post("/auth/sendotp", sendOTP);
router.post("/postNote", createNote);
router.get("/getNote", getNote);

module.exports = router;
