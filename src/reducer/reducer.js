import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice.js"
import profileReducer from "../slices/ProfileSilice.js"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})

export default rootReducer;