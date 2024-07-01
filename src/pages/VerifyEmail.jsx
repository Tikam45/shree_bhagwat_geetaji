import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../apiconnect/operations";
import { useNavigate } from "react-router-dom";
import "../components/VerifyEmail.css"

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access to this route when user has filled the signup form
    if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    if (signupData) {
      const { firstName, lastName, email, password, confirmPassword } = signupData.formData;
      // console.log("Signup Data:", signupData);
      dispatch(
        signUp({ firstName, lastName, email, password, confirmPassword, otp, navigate })
      );
    } else {
      console.error("Signup data is missing");
    }
  };

  return (
    <div className="verify-email-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="verify-email-form-container">
          <h1 className="verify-email-title">Verify Email</h1>
          <p className="verify-email-text">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="otp-input-field"
                />
              )}
              containerStyle="otp-input-container"
            />
            <button type="submit" className="verify-button">
              Verify Email
            </button>
          </form>
          <div className="other-links">
            <Link to="/signup" className="navigation-link">
              <BiArrowBack /> Back To Signup
            </Link>
            <button
              className="resend-button"
              onClick={() => {
                  dispatch(sendOtp(signupData?.formData.email, navigate))
                  // console.log("data", signupData)
                  // console.log( String(signupData.formData.email))
                }
              }
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
