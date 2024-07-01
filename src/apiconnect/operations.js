import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../slices/AuthSlice"
import {apiConnector} from "./apicall"
import { endpoints } from "./apis"
import ProfileSilice, { setUser } from "../slices/ProfileSilice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"


const {SENDOTP_API,  SIGNUP_API, LOGIN_API} = endpoints
const {GET_NOTE, POST_NOTE } = endpoints;


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      // console.log("HI");
      // console.log(email);
      const response = await apiConnector("POST", SENDOTP_API, {email})
      console.log("SENDOTP API RESPONSE............", response)
    
      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    }
     catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function signUp( {firstName, lastName, email, password, confirmPassword,  otp, navigate}) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      // console.log(firstName, lastName, email, password, confirmPassword, otp, "in signup dispatch");
      const response = await apiConnector("POST", SIGNUP_API, { firstName,  lastName,  email,  password,  confirmPassword,  otp})
      console.log("SIGNUP API RESPONSE............", response)

      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    }
     catch (error) {
      toast.dismiss("Something went wrong")
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {email, password})
      console.log("LOGIN API RESPONSE............", response)

      if(!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.existingUser?.image ? response.data.existingUser.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName} ${response.data.existingUser.lastName}`
      dispatch(setUser(response.data.existingUser))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.existingUser))
      navigate("/")
    }
     catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


export async function getNote({setDescription, chapter, slok, user}){
  try{
    // // const navigate = useNavigate();
    // if(!user){
    //   // toast.error("Please Log in First")
    //   // setDescription("");
    //   // navigate("/signup");
    //   return;
    // }
    const email = user.email;
    console.log(email);
    const params = {email: email, chapterNumber:chapter, slokNumber: slok};
    const response = await apiConnector("GET", GET_NOTE,null, null, params);
    console.log("hi", response);
    if(response.data && response.data.description){
      setDescription(response.data.description);
      console.log(response.data.description)
    }
  }
  catch(error){
    console.log(error);
    toast.error("Could not Fetch Note");
  }
}

export async function postNote({chapter, slok, description, setDescription, navigate, user}){
  // react hooks can only be called in function body of a react component. IMPORTANT
  // const navigate = useNavigate();
  // const {user} = useSelector((state) => state.profile);
  try{
    if(!user){
      toast.error("Please Log in First")
      // setDescription("");
      navigate("/signup");
      return;
    }
    const email = user.email;
    const response = await apiConnector("POST", POST_NOTE, {email, chapterNumber:chapter, slokNumber: slok, description});
    setDescription(description);
  }
  catch(error){
    console.log(error);
    toast.error("Internal Server Error")
  }
}