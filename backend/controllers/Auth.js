const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// send OTP
exports.sendOTP = async (request, response) => {
  try {
    console.log("Hello");
    const { email } = request.body;

    // check if user already exist
    // can't use find(). It returns array even if it is empty. findOne returns single document
    const checkUserPresent = await User.findOne({ email });

    // if user exists
    if (checkUserPresent) {
      return response.status(401).json({
        success: false,
        message: "User is already registered"
      });
    }

    // generate otp
    // otp of 6 length with given options
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpPayload = { email, otp };

    // create the otp entry in db
    // yaha otp.create hai aur otp kai model mai humne pre save hook likha hai toh otp.create se pahele mail send ho jaayega
    // yaha ho raha hai mail send by nodemailer
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    response.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("Error while sending otp", error);
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SignUp
exports.signUp = async (request, response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      request.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return response.status(403).json({
        success: false,
        message: "All fields are compulsory"
      });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({
        success: false,
        message: "Password fields doesn't match",
      });
    }

    const ifUserexists = await User.findOne({ email });
    if (ifUserexists) {
      return response.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    // find most recent otp
    // sort({ createdAt: -1 }): This sorts the results in descending order based on the createdAt field. The -1 indicates descending order, so you'll get the latest or most recent document first.
    //.limit(1): This limits the number of documents returned to just one. In this case, it ensures that only the most recent document (based on the createdAt field) is returned.
    const recentOtp = await OTP
      .find({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validate OTP
    if (recentOtp.length === 0) {
      return response.status(400).json({
        success: false,
        message: "Error while matching OTP",
      });
    } else if (otp !== recentOtp[0].otp) {
      return response.status(400).json({
        success: false,
        message: "OTP is not matching",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in DB

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // it is using dicebear api to generate the profile pic based on first and last name
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}-${lastName}`,
    });

    return response.status(200).json({
      success: true,
      message: "User is Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "User could not be registered",
    });
  }
};

// Login
exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(403).json({
        success: false,
        message: "All fields are compulsory",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return response.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      response.cookie("token", token, options).status(200).json({
        success: true,
        token,
        existingUser,
        message: "Logged in Successfully",
      });
    } else {
      return response.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};
