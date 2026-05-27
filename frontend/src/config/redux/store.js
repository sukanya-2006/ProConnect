
import authReducer from "./reducer/authReducer";
import postReducer from "./reducer/postReducer"; // ← ADD THIS
import { configureStore } from "@reduxjs/toolkit";

//
//  STEPS FOR STATE MANAGEMENT
//
//Submit action
//Handle action in its reducer
//Register Here -> Reducer
//



export const store = configureStore({
     reducer: {
        auth: authReducer,
        postReducer: postReducer,
     }
})