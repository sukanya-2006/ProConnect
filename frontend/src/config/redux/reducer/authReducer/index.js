
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getAboutUser, getAllUsers, getConnectionsRequest, getMyConnectionsRequest } from "../../action/authAction";
// const { loginUser } = require("../../action/authAction")


const initialState = {
    user: undefined,
    isError: false,
    isSuccess : false,
    isLoading : false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users: [],
    all_profiles_fetched: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        },
        emptyMessage: (state) => {
            state.message = ""
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false
        }
    },

    extraReducers: (builder) => {


        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.message = "Knocking the door..."
        })
        .addCase(loginUser.fulfilled, (state, action) => {

            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Login is successful"
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || action.payload || "Something went wrong"
        })
        
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Registering you..";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Registration is successful, Please Login"
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
             state.message = action.payload?.message || action.payload || "Something went wrong"
        })
        .addCase(getAboutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.profileFetched = true;
            state.user = action.payload
            
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.all_users = action.payload.profiles;
            state.all_profiles_fetched = true;
        })
        .addCase(getConnectionsRequest.fulfilled, (state, action) => {
            state.connections = action.payload;
        })
        .addCase(getConnectionsRequest.rejected,(state, action) => {
            state.message = action.payload
        })
        .addCase(getMyConnectionsRequest.fulfilled, (state, action) => {
            state.connectionRequest = action.payload;
        })
        .addCase(getMyConnectionsRequest.rejected, (state, action) => {
            state.message = action.payload
        })
    }}
)

export const { reset, handleLoginUser ,emptyMessage, setTokenIsThere, setTokenIsNotThere} = authSlice.actions;

export default authSlice.reducer